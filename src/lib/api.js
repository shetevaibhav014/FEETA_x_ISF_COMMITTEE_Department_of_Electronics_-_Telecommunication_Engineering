import { supabase, uploadMedia } from "./supabase";

/**
 * Universal Supabase API adapter providing high-speed database operations,
 * Row Level Security (RLS), full audit logs, and authentication services.
 */
export async function api(path, options = {}) {
  const method = (options.method || "GET").toUpperCase();
  const url = new URL(path, "http://localhost");
  const pathname = url.pathname;
  const searchParams = url.searchParams;

  // --------------------------------------------------------------------------
  // 1. AUTHENTICATION ENDPOINTS
  // --------------------------------------------------------------------------
  if (pathname === "/auth/session") {
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    if (sessionError || !session?.user) {
      throw new Error("Please sign in to continue.");
    }

    // Fetch profile role and active status
    const { data: profile } = await supabase
      .from("profiles")
      .select("role, active, full_name")
      .eq("id", session.user.id)
      .single();

    if (profile && profile.active === false) {
      await supabase.auth.signOut();
      throw new Error("This account has been deactivated.");
    }

    const isSuperAdmin = profile?.role === "superadmin" || session.user.email === "awdheshchorghade.etc24@sbjit.edu.in";
    const role = isSuperAdmin ? "superadmin" : (profile?.role || "admin");

    return {
      user: {
        id: session.user.email || profile?.full_name || "Admin",
        email: session.user.email,
        fullName: profile?.full_name || session.user.email,
        role,
        isSuperAdmin,
      },
    };
  }

  if (pathname === "/auth/logout") {
    await supabase.auth.signOut();
    return { ok: true };
  }

  // --------------------------------------------------------------------------
  // 2. SEEDING & SITE META
  // --------------------------------------------------------------------------
  if (pathname === "/seed-status") {
    const { data } = await supabase
      .from("site_meta")
      .select("value")
      .eq("key", "default_content_seeded")
      .maybeSingle();

    return { initialized: data?.value === "true" };
  }

  if (pathname === "/seed-content" && method === "POST") {
    const body = typeof options.body === "string" ? JSON.parse(options.body) : options.body;
    const records = body.records || [];

    const formatted = records.map((item, index) => ({
      id: crypto.randomUUID(),
      type: item.type,
      title: item.title,
      data: item.data || {},
      status: "published",
      visible: true,
      position: typeof item.position === "number" ? item.position : index,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }));

    const { error } = await supabase.from("content").upsert(formatted);
    if (error) throw error;

    await supabase
      .from("site_meta")
      .upsert({ key: "default_content_seeded", value: "true" });

    return { imported: formatted.length };
  }

  // --------------------------------------------------------------------------
  // 3. CONTENT ENDPOINTS
  // --------------------------------------------------------------------------
  if (pathname === "/content" && method === "GET") {
    const isTrash = searchParams.get("trash") === "true";
    const type = searchParams.get("type");

    let query = supabase.from("content").select("*");

    if (isTrash) {
      query = query.not("deleted_at", "is", null).order("deleted_at", { ascending: false });
    } else {
      query = query.is("deleted_at", null);
      if (type) {
        query = query.eq("type", type);
      }
      query = query.order("position", { ascending: true }).order("created_at", { ascending: false });
    }

    const { data, error } = await query;
    if (error) throw error;

    return (data || []).map((row) => ({
      ...row,
      data: typeof row.data === "string" ? JSON.parse(row.data) : (row.data || {}),
      visible: Boolean(row.visible),
    }));
  }

  if (pathname === "/content" && method === "POST") {
    const body = typeof options.body === "string" ? JSON.parse(options.body) : options.body;
    const { data: { user } } = await supabase.auth.getUser();

    const insertPayload = {
      id: crypto.randomUUID(),
      type: body.type,
      title: body.title,
      data: body.data || {},
      status: body.status || "draft",
      publish_at: body.publishAt || null,
      expires_at: body.expiresAt || null,
      visible: body.visible !== false,
      position: typeof body.position === "number" ? body.position : 0,
      created_by: user?.email || "admin",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from("content")
      .insert([insertPayload])
      .select()
      .single();

    if (error) throw error;

    // Log activity
    await supabase.from("activity").insert([
      {
        user_id: user?.email || "admin",
        action: `created ${body.type}`,
        item_type: body.type,
        item_id: data.id,
      },
    ]);

    return {
      ...data,
      data: typeof data.data === "string" ? JSON.parse(data.data) : data.data,
    };
  }

  // Content Reorder
  if (pathname === "/content/reorder" && method === "POST") {
    const body = typeof options.body === "string" ? JSON.parse(options.body) : options.body;
    const { ids = [] } = body;

    const updates = ids.map((id, index) =>
      supabase.from("content").update({ position: index }).eq("id", id)
    );

    await Promise.all(updates);
    return { ok: true };
  }

  // Restore content
  const restoreMatch = pathname.match(/^\/content\/([^/]+)\/restore$/);
  if (restoreMatch && method === "POST") {
    const id = restoreMatch[1];
    const { data: { user } } = await supabase.auth.getUser();

    const { error } = await supabase
      .from("content")
      .update({ deleted_at: null })
      .eq("id", id);

    if (error) throw error;

    await supabase.from("activity").insert([
      {
        user_id: user?.email || "admin",
        action: "restored content",
        item_type: "content",
        item_id: id,
      },
    ]);

    return { ok: true };
  }

  // Content item by ID (PUT / DELETE)
  const contentItemMatch = pathname.match(/^\/content\/([^/]+)$/);
  if (contentItemMatch) {
    const id = contentItemMatch[1];
    const { data: { user } } = await supabase.auth.getUser();

    if (method === "PUT") {
      const body = typeof options.body === "string" ? JSON.parse(options.body) : options.body;
      const updatePayload = {
        title: body.title,
        data: body.data || {},
        status: body.status || "draft",
        publish_at: body.publishAt || null,
        expires_at: body.expiresAt || null,
        visible: body.visible !== false,
        updated_at: new Date().toISOString(),
      };

      const { data, error } = await supabase
        .from("content")
        .update(updatePayload)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;

      await supabase.from("activity").insert([
        {
          user_id: user?.email || "admin",
          action: `updated ${body.type || "content"}`,
          item_type: body.type || "content",
          item_id: id,
        },
      ]);

      return {
        ...data,
        data: typeof data.data === "string" ? JSON.parse(data.data) : data.data,
      };
    }

    if (method === "DELETE") {
      // Soft-delete to trash
      const { error } = await supabase
        .from("content")
        .update({ deleted_at: new Date().toISOString() })
        .eq("id", id);

      if (error) throw error;

      await supabase.from("activity").insert([
        {
          user_id: user?.email || "admin",
          action: "moved content to trash",
          item_type: "content",
          item_id: id,
        },
      ]);

      return { ok: true };
    }
  }

  // --------------------------------------------------------------------------
  // 4. SUBMISSIONS & FORMS ENDPOINTS
  // --------------------------------------------------------------------------
  if (pathname === "/forms" && method === "GET") {
    const isTrash = searchParams.get("trash") === "true";
    let query = supabase.from("submissions").select("*");

    if (isTrash) {
      query = query.not("deleted_at", "is", null).order("created_at", { ascending: false });
    } else {
      query = query.is("deleted_at", null).order("created_at", { ascending: false });
    }

    const { data, error } = await query;
    if (error) throw error;

    return (data || []).map((row) => ({
      ...row,
      data: typeof row.data === "string" ? JSON.parse(row.data) : (row.data || {}),
    }));
  }

  if (pathname === "/forms" && method === "POST") {
    const body = typeof options.body === "string" ? JSON.parse(options.body) : options.body;
    const id = crypto.randomUUID();
    const { error } = await supabase
      .from("submissions")
      .insert([
        {
          id,
          data: body,
          is_read: false,
        },
      ]);

    if (error) throw error;
    return { ok: true, id };
  }

  // Restore form submission
  const restoreFormMatch = pathname.match(/^\/forms\/([^/]+)\/restore$/);
  if (restoreFormMatch && method === "POST") {
    const id = restoreFormMatch[1];
    const { error } = await supabase
      .from("submissions")
      .update({ deleted_at: null })
      .eq("id", id);

    if (error) throw error;
    return { ok: true };
  }

  const formItemMatch = pathname.match(/^\/forms\/([^/]+)$/);
  if (formItemMatch) {
    const id = formItemMatch[1];

    if (method === "PATCH") {
      const body = typeof options.body === "string" ? JSON.parse(options.body) : options.body;
      const { error } = await supabase
        .from("submissions")
        .update({ is_read: body.is_read })
        .eq("id", id);

      if (error) throw error;
      return { ok: true };
    }

    if (method === "DELETE") {
      const { error } = await supabase
        .from("submissions")
        .update({ deleted_at: new Date().toISOString() })
        .eq("id", id);

      if (error) throw error;
      return { ok: true };
    }
  }

  // --------------------------------------------------------------------------
  // 5. ACTIVITY LOG
  // --------------------------------------------------------------------------
  if (pathname === "/activity" && method === "GET") {
    const { data, error } = await supabase
      .from("activity")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(60);

    if (error) throw error;
    return data || [];
  }

  // --------------------------------------------------------------------------
  // 6. USERS & PROFILES
  // --------------------------------------------------------------------------
  if (pathname === "/users" && method === "GET") {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
  }

  if (pathname === "/users" && method === "POST") {
    const body = typeof options.body === "string" ? JSON.parse(options.body) : options.body;
    const userEmail = body.id?.includes("@") ? body.id : `${body.id}@sbjit.edu.in`;

    const { data, error } = await supabase.auth.signUp({
      email: userEmail,
      password: body.password,
      options: {
        data: {
          role: body.role || "editor",
          full_name: body.id,
        },
      },
    });

    if (error) throw error;

    if (data.user) {
      await supabase.from("profiles").upsert({
        id: data.user.id,
        email: userEmail,
        full_name: body.id,
        role: body.role || "editor",
        active: true,
        updated_at: new Date().toISOString(),
      });
    }

    return { ok: true, user: data.user };
  }

  const userItemMatch = pathname.match(/^\/users\/([^/]+)$/);
  if (userItemMatch && method === "PATCH") {
    const targetId = decodeURIComponent(userItemMatch[1]);
    const body = typeof options.body === "string" ? JSON.parse(options.body) : options.body;
    const updatePayload = { updated_at: new Date().toISOString() };
    if (body.role !== undefined) updatePayload.role = body.role;
    if (body.active !== undefined) updatePayload.active = body.active;
    if (body.full_name !== undefined) updatePayload.full_name = body.full_name;

    let query = supabase.from("profiles").update(updatePayload);
    if (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(targetId)) {
      query = query.eq("id", targetId);
    } else {
      query = query.eq("email", targetId);
    }

    const { error } = await query;
    if (error) throw error;
    return { ok: true };
  }

  // --------------------------------------------------------------------------
  // 7. FILE UPLOADS (SUPABASE STORAGE)
  // --------------------------------------------------------------------------
  if (pathname === "/upload" && method === "POST") {
    const alt = searchParams.get("alt") || "";
    const file = options.body;

    const publicUrl = await uploadMedia(file, "images");
    return {
      url: publicUrl,
      alt,
    };
  }

  // --------------------------------------------------------------------------
  // 8. BACKUP & EXPORT
  // --------------------------------------------------------------------------
  if (pathname === "/backup" && method === "GET") {
    const [content, submissions, siteMeta] = await Promise.all([
      supabase.from("content").select("*"),
      supabase.from("submissions").select("*"),
      supabase.from("site_meta").select("*"),
    ]);

    return {
      exported_at: new Date().toISOString(),
      content: content.data || [],
      submissions: submissions.data || [],
      site_meta: siteMeta.data || [],
    };
  }

  if (pathname === "/backup" && method === "POST") {
    const body = typeof options.body === "string" ? JSON.parse(options.body) : options.body;
    const contentToImport = body.content || [];

    if (contentToImport.length > 0) {
      const { error } = await supabase.from("content").upsert(contentToImport);
      if (error) throw error;
    }

    return { imported: contentToImport.length };
  }

  throw new Error(`Endpoint not found: ${method} ${pathname}`);
}
