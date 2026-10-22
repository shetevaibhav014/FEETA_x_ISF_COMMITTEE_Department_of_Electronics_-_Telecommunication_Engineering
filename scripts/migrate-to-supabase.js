import { DatabaseSync } from "node:sqlite";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://djyilvmysdniwqmfbkgg.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRqeWlsdm15c2RuaXdxbWZia2dnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI2Nzc3ODUsImV4cCI6MjEwODI1Mzc4NX0.yDKjtnaXxHND4Wd-Bb0RLsTL1jZFKfW-p2tzg9GwjFY";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function migrate() {
  console.log("1. Authenticating with Supabase...");
  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email: "admin@etcforum.com",
    password: "Admin@FEETA2026!",
  });
  if (authError) {
    console.error("Auth failed:", authError.message);
    process.exit(1);
  }
  console.log("   Authenticated as admin:", authData.user.email);

  console.log("2. Reading rows from local SQLite database...");
  const db = new DatabaseSync("./data/feeta.sqlite");
  const rows = db.prepare("SELECT * FROM content").all();
  console.log(`   Found ${rows.length} rows to migrate.`);

  console.log("3. Clearing existing test content in Supabase...");
  await supabase.from("content").delete().neq("id", "none");

  console.log("4. Inserting rows into Supabase...");
  const formattedRows = rows.map((row) => ({
    id: row.id,
    type: row.type,
    title: row.title,
    data: typeof row.data === "string" ? JSON.parse(row.data) : row.data,
    status: row.status || "published",
    publish_at: row.publish_at || null,
    expires_at: row.expires_at || null,
    visible: Boolean(row.visible),
    position: row.position || 0,
    deleted_at: row.deleted_at || null,
    created_at: row.created_at || new Date().toISOString(),
    updated_at: row.updated_at || new Date().toISOString(),
    created_by: row.created_by || "admin",
  }));

  // Insert in batches of 20
  for (let i = 0; i < formattedRows.length; i += 20) {
    const batch = formattedRows.slice(i, i + 20);
    const { error: insertError } = await supabase.from("content").upsert(batch);
    if (insertError) {
      console.error(`   Error inserting batch at ${i}:`, insertError.message);
    } else {
      console.log(`   Migrated items ${i + 1} to ${Math.min(i + 20, formattedRows.length)}`);
    }
  }

  console.log("5. Updating site metadata in Supabase...");
  await supabase.from("site_meta").upsert([
    { key: "default_content_seeded", value: "true" },
    { key: "migrated_at", value: new Date().toISOString() },
  ]);

  console.log("6. Verifying anonymous public access...");
  const publicClient = createClient(supabaseUrl, supabaseAnonKey);
  const { data: publicRows, error: publicError } = await publicClient
    .from("content")
    .select("type, count")
    .eq("status", "published")
    .eq("visible", true);

  if (publicError) throw publicError;

  console.log("   Public content query successful! Rows found:", publicRows?.length);
  console.log("=== Migration to Supabase Complete ===");
}

migrate().catch(console.error);
