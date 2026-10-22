import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { api } from "../lib/api";
import { useToast } from "../context/useToast";
import { defaultAdminContent } from "../data/defaultAdminContent";
import "../styles/admin.css";

const managers = [
  ["hero", "Hero & calls to action"],
  ["about", "About content"],
  ["timeline", "About timeline"],
  ["team", "Team members"],
  ["events", "Events"],
  ["gallery", "Gallery albums & photos"],
  ["announcements", "Announcements"],
  ["resources", "Resources & links"],
  ["event-popup", "Event photo popup"],
  ["footer", "Footer links & socials"],
  ["seo", "SEO by page"],
  ["legal", "Privacy & terms"],
];
const tabs = [...managers, ["submissions", "Form submissions"], ["trash", "Trash"], ["activity", "Activity log"], ["users", "Users & roles"], ["backup", "Backup & export"]];

const emptyRecord = (type) => ({
  title: "",
  data: ({
    hero: { description: "", primaryCta: "Explore Community", primaryUrl: "/community", secondaryCta: "Meet the Committee", secondaryUrl: "/team" },
    about: { description: "" },
    timeline: { date: "", description: "" },
    team: { role: "", category: "FEETA", year: "", image: "", alt: "", linkedinUrl: "", socials: {} },
    events: { date: "", month: "", venue: "", description: "", category: "Technical", poster: "", alt: "", registrationLink: "", isAvailable: true },
    gallery: { album: "", image: "", alt: "", category: "Event" },
    announcements: { description: "", pinned: false },
    resources: { description: "", url: "" },
    "event-popup": { eyebrow: "Featured Event", description: "", image: "", alt: "", url: "/installation-ceremony", buttonText: "View Photos", enabled: true },
    footer: { email: "etcforum@sbjit.edu.in", phone: "+91 94059 05318", linkedin: "", instagram: "", links: [] },
    seo: { path: "/", title: "", description: "", socialImage: "" },
    legal: { slug: "privacy", content: "" },
  }[type] || { description: "" }),
  status: "draft",
  publishAt: "",
  expiresAt: "",
  visible: true,
});

async function compressImage(file) {
  const allowedTypes = new Set(["image/jpeg", "image/png"]);
  const allowedExtensions = /\.(jpe?g|png)$/i;
  if ((file.type && !allowedTypes.has(file.type)) || !allowedExtensions.test(file.name)) {
    throw new Error("Choose a JPG, JPEG, or PNG image.");
  }
  if (file.size > 20 * 1024 * 1024) throw new Error("Choose an image smaller than 20 MB.");
  let image;
  try {
    image = await createImageBitmap(file);
  } catch {
    throw new Error("The selected image could not be read. Choose a valid JPG, JPEG, or PNG file.");
  }
  const scale = Math.min(1, 1600 / Math.max(image.width, image.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(image.width * scale);
  canvas.height = Math.round(image.height * scale);
  const context = canvas.getContext("2d");
  if (!context) {
    image.close();
    throw new Error("Image compression is unavailable in this browser.");
  }
  context.drawImage(image, 0, 0, canvas.width, canvas.height);
  image.close();
  const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.82));
  if (!blob) throw new Error("Image compression failed.");
  return blob;
}

export default function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);
  const [activeTab, setActiveTab] = useState("hero");
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState(null);
  const [jsonValue, setJsonValue] = useState("{}");
  const [search, setSearch] = useState("");
  const [inbox, setInbox] = useState([]);
  const [activity, setActivity] = useState([]);
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ id: "", password: "", role: "editor" });
  const [busy, setBusy] = useState(false);
  const [draggedId, setDraggedId] = useState(null);
  const [showEditor, setShowEditor] = useState(false);
  const uploadRef = useRef(null);
  const navigate = useNavigate();
  const { notify } = useToast();

  const loadSession = useCallback(async () => {
    try {
      const result = await api("/auth/session");
      if (result.user.role === "admin" || result.user.role === "superadmin") {
        try {
          const seedStatus = await api("/seed-status");
          if (!seedStatus.initialized) {
            const seeded = await api("/seed-content", {
              method: "POST",
              body: JSON.stringify({ records: defaultAdminContent }),
            });
            if (seeded.imported) notify("Current website content is ready to manage.");
          }
        } catch (seedError) {
          notify(`Could not initialize website content: ${seedError.message}`, "error");
        }
      }
      setUser(result.user);
    } catch {
      setUser(null);
    } finally {
      setReady(true);
    }
  }, [notify]);

  useEffect(() => { loadSession(); }, [loadSession]);

  const loadTab = useCallback(async () => {
    if (!user) return;
    try {
      if (activeTab === "submissions") {
        setInbox(await api("/forms"));
      } else if (activeTab === "trash") {
        const [contentTrash, submissionTrash] = await Promise.all([
          api("/content?trash=true"),
          api("/forms?trash=true"),
        ]);
        setItems([
          ...contentTrash,
          ...submissionTrash.map((entry) => ({
            ...entry,
            id: `submission-${entry.id}`,
            title: entry.data.name || entry.data.email || "Form submission",
            type: "submission",
            data: { ...entry.data, description: entry.data.message },
          })),
        ]);
      } else if (activeTab === "activity") {
        setActivity(await api("/activity"));
      } else if (activeTab === "users") {
        setUsers(await api("/users"));
      } else if (activeTab === "backup") {
        setItems([]);
      } else {
        const query = `?type=${encodeURIComponent(activeTab)}`;
        setItems(await api(`/content${query}`));
      }
    } catch (error) {
      if (error.message.includes("sign in")) {
        setUser(null);
        navigate("/admin/login", { replace: true });
      } else {
        notify(error.message, "error");
      }
    }
  }, [activeTab, navigate, notify, user]);

  useEffect(() => { loadTab(); }, [loadTab]);

  const currentLabel = tabs.find(([key]) => key === activeTab)?.[1] || "Content";
  const filteredItems = useMemo(() => items.filter((item) => {
    const value = `${item.title} ${item.type} ${JSON.stringify(item.data)}`.toLowerCase();
    return value.includes(search.toLowerCase());
  }), [items, search]);

  const startNew = () => {
    const empty = emptyRecord(activeTab);
    setSelected(empty);
    setJsonValue(JSON.stringify(empty.data, null, 2));
    setShowEditor(true);
  };

  const startEdit = (item) => {
    setSelected({ ...item, publishAt: item.publish_at || "", expiresAt: item.expires_at || "" });
    setJsonValue(JSON.stringify(item.data || {}, null, 2));
    setShowEditor(true);
  };

  const saveItem = async (event) => {
    event.preventDefault();
    let data;
    try {
      data = JSON.parse(jsonValue);
      if (!data || Array.isArray(data) || typeof data !== "object") throw new Error();
    } catch {
      notify("Content details must be a valid JSON object.", "error");
      return;
    }
    if ((data.image || data.poster) && !String(data.alt || "").trim()) {
      notify("Add descriptive alt text for the uploaded image before saving.", "error");
      return;
    }
    if (activeTab === "team" && !data.image) {
      notify("Add a team photo before saving this member.", "error");
      return;
    }
    if (activeTab === "gallery" && !data.image && !data.poster) {
      notify("Add a gallery photo before saving this item.", "error");
      return;
    }
    setBusy(true);
    try {
      const payload = {
        type: activeTab,
        title: selected.title.trim(),
        data,
        status: selected.status,
        publishAt: selected.publishAt || null,
        expiresAt: selected.expiresAt || null,
        visible: selected.visible,
      };
      await api(selected.id ? `/content/${selected.id}` : "/content", {
        method: selected.id ? "PUT" : "POST",
        body: JSON.stringify(payload),
      });
      notify(selected.id ? "Content updated." : "Content created.");
      setShowEditor(false);
      await loadTab();
    } catch (error) {
      notify(error.message, "error");
    } finally {
      setBusy(false);
    }
  };

  const deleteItem = async (item) => {
    if (!window.confirm(`Move “${item.title}” to trash? It can be restored for 30 days.`)) return;
    try {
      await api(`/content/${item.id}`, { method: "DELETE" });
      notify("Moved to trash.");
      await loadTab();
    } catch (error) {
      notify(error.message, "error");
    }
  };

  const restoreItem = async (item) => {
    try {
      if (item.type === "submission") {
        await api(`/forms/${item.id.replace("submission-", "")}/restore`, { method: "POST" });
      } else {
        await api(`/content/${item.id}/restore`, { method: "POST" });
      }
      notify("Content restored.");
      await loadTab();
    } catch (error) {
      notify(error.message, "error");
    }
  };

  const reorder = async (targetId) => {
    if (!draggedId || draggedId === targetId) return;
    const reordered = [...items];
    const from = reordered.findIndex((item) => item.id === draggedId);
    const to = reordered.findIndex((item) => item.id === targetId);
    const [moving] = reordered.splice(from, 1);
    reordered.splice(to, 0, moving);
    setItems(reordered);
    setDraggedId(null);
    try {
      await api("/content/reorder", {
        method: "POST",
        body: JSON.stringify({ type: activeTab, ids: reordered.map((item) => item.id) }),
      });
    } catch (error) {
      notify(error.message, "error");
      await loadTab();
    }
  };

  const uploadImage = async (file) => {
    if (!selected) return;
    let alt;
    try {
      const data = JSON.parse(jsonValue);
      alt = data.alt?.trim();
    } catch {
      notify("Enter valid content details before uploading an image.", "error");
      return;
    }
    if (!alt) {
      notify("Add an alt field to the content JSON before uploading, for example: \"alt\": \"Students at a workshop\".", "error");
      return;
    }
    try {
      const compressed = await compressImage(file);
      const result = await api(`/upload?alt=${encodeURIComponent(alt)}`, {
        method: "POST",
        headers: { "Content-Type": compressed.type },
        body: compressed,
      });
      const data = JSON.parse(jsonValue);
      const imageField = activeTab === "events" || (data.poster && !data.image) ? "poster" : "image";
      data[imageField] = result.url;
      data.alt = result.alt;
      setJsonValue(JSON.stringify(data, null, 2));
      notify("Compressed image uploaded. Save the record to keep the image path.");
    } catch (error) {
      notify(error.message, "error");
    }
  };

  const exportCsv = () => {
    const csvCell = (value) => {
      const safeValue = /^[=+\-@]/.test(String(value ?? "")) ? `'${value}` : value;
      return `"${String(safeValue ?? "").replaceAll('"', '""')}"`;
    };
    const rows = [["Name", "Email", "Message", "Submitted", "Read"], ...inbox.map(({ data, created_at, is_read }) =>
      [data.name, data.email, data.message, created_at, is_read ? "Yes" : "No"])];
    const content = rows.map((row) => row.map(csvCell).join(",")).join("\r\n");
    const link = document.createElement("a");
    link.href = URL.createObjectURL(new Blob([content], { type: "text/csv;charset=utf-8" }));
    link.download = "feeta-submissions.csv";
    link.click();
    URL.revokeObjectURL(link.href);
  };

  const exportBackup = async () => {
    try {
      const data = await api("/backup");
      const link = document.createElement("a");
      link.href = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], { type: "application/json" }));
      link.download = `feeta-backup-${new Date().toISOString().slice(0, 10)}.json`;
      link.click();
      URL.revokeObjectURL(link.href);
      notify("Backup exported.");
    } catch (error) {
      notify(error.message, "error");
    }
  };

  const importBackup = async (file) => {
    try {
      const body = JSON.parse(await file.text());
      if (!window.confirm("Import backup content? Existing records with matching IDs will not be overwritten.")) return;
      const result = await api("/backup", { method: "POST", body: JSON.stringify(body) });
      notify(`${result.imported} content records imported.`);
    } catch (error) {
      notify(error.message, "error");
    }
  };

  const createUser = async (event) => {
    event.preventDefault();
    try {
      await api("/users", { method: "POST", body: JSON.stringify(newUser) });
      setNewUser({ id: "", password: "", role: "editor" });
      notify("User created.");
      await loadTab();
    } catch (error) {
      notify(error.message, "error");
    }
  };

  const updateSubmission = async (submission, remove = false) => {
    if (remove && !window.confirm("Move this submission to trash?")) return;
    try {
      await api(`/forms/${submission.id}`, {
        method: remove ? "DELETE" : "PATCH",
        ...(remove ? {} : { body: JSON.stringify({ is_read: !submission.is_read }) }),
      });
      await loadTab();
      notify(remove ? "Submission moved to trash." : "Submission status updated.");
    } catch (error) {
      notify(error.message, "error");
    }
  };

  const logout = async () => {
    try {
      await api("/auth/logout", { method: "POST" });
      navigate("/admin/login", { replace: true });
    } catch (error) {
      notify(error.message, "error");
    }
  };

  if (!ready) {
    return <div className="admin-page"><div className="admin-skeleton"><i /><i /><i /></div></div>;
  }
  if (!user) return <Navigate to="/admin/login" replace />;

  return (
    <div className="admin-page">
      <header className="admin-topbar">
        <a href="/" className="admin-brand"><img src="/etc-logo.png" alt="" /><span>ETC Forum <small>Content desk</small></span></a>
        <div className="admin-account">
          <span>
            {user.fullName || user.id}{" "}
            <small style={{
              background: user.role === "superadmin" ? "linear-gradient(135deg, #f59e0b, #d97706)" : "#0284c7",
              color: "#fff",
              padding: "2px 8px",
              borderRadius: "999px",
              fontWeight: 700,
              fontSize: "11px",
              marginLeft: "6px"
            }}>
              {user.role === "superadmin" ? "👑 Beyond Admin" : "🛡️ Admin"}
            </small>
          </span>
          <button className="admin-button admin-button-muted" onClick={logout}>Sign out</button>
        </div>
      </header>
      <div className="admin-layout">
        <aside className="admin-sidebar">
          <p className="admin-kicker">Workspace</p>
          <nav aria-label="Admin dashboard">
            {tabs.filter(([key]) => user.role === "admin" || user.role === "superadmin" || !["activity", "users", "backup"].includes(key)).map(([key, label]) => (
              <button key={key} className={activeTab === key ? "active" : ""} onClick={() => { setActiveTab(key); setSearch(""); setShowEditor(false); }}>
                <span>{label}</span>
                {key === "users" && user.role === "superadmin" && <span style={{ marginLeft: "4px", fontSize: "11px" }}>👑</span>}
                {key === "submissions" && inbox.some((entry) => !entry.is_read) && <i aria-label="Unread submissions" />}
              </button>
            ))}
          </nav>
          <p className="admin-session-note">Your secure session ends after 30 minutes without activity.</p>
        </aside>
        <section className="admin-workspace">
          <div className="admin-page-heading">
            <div>
              <p className="admin-kicker">Manage your website</p>
              <h1>{currentLabel}</h1>
              <p>Changes are securely stored in the Supabase PostgreSQL cloud database.</p>
            </div>
            {managers.some(([key]) => key === activeTab) && !showEditor &&
              <button type="button" className="admin-button" onClick={startNew}>＋ Add item</button>}
          </div>

          {showEditor && (
            <form className="admin-editor" onSubmit={saveItem}>
              <div className="admin-editor-heading"><h2>{selected.id ? "Edit item" : "Create item"}</h2><button type="button" className="admin-text-button" onClick={() => setShowEditor(false)}>Close</button></div>
              <label>Title<input required value={selected.title} onChange={(event) => setSelected({ ...selected, title: event.target.value })} /></label>
              <div className="admin-editor-grid">
                <label>Publication<select value={selected.status} onChange={(event) => setSelected({ ...selected, status: event.target.value })}><option value="draft">Draft</option><option value="published">Published</option></select></label>
                <label>Schedule publication<input type="datetime-local" value={selected.publishAt?.slice(0, 16) || ""} onChange={(event) => setSelected({ ...selected, publishAt: event.target.value ? new Date(event.target.value).toISOString() : "" })} /></label>
                <label>Expire at (optional)<input type="datetime-local" value={selected.expiresAt?.slice(0, 16) || ""} onChange={(event) => setSelected({ ...selected, expiresAt: event.target.value ? new Date(event.target.value).toISOString() : "" })} /></label>
              </div>
              <label className="admin-checkbox"><input type="checkbox" checked={selected.visible} onChange={(event) => setSelected({ ...selected, visible: event.target.checked })} />Visible on the public website</label>
              <label>Content fields <span className="admin-field-hint">JSON is used for flexible fields such as descriptions, image paths, categories, dates, venue, links, social profiles, pinned state and alt text.</span>
                <textarea className="admin-json-editor" spellCheck="false" value={jsonValue} onChange={(event) => setJsonValue(event.target.value)} />
              </label>
              <div className="admin-editor-actions">
                <input ref={uploadRef} type="file" accept=".jpg,.jpeg,.png,image/jpeg,image/png" hidden onChange={(event) => event.target.files?.[0] && uploadImage(event.target.files[0])} />
                <button type="button" className="admin-button admin-button-muted" onClick={() => uploadRef.current?.click()}>Upload compressed image</button>
                <button type="submit" className="admin-button" disabled={busy}>{busy ? "Saving…" : "Save item"}</button>
              </div>
            </form>
          )}

          {(managers.some(([key]) => key === activeTab) || activeTab === "trash") && !showEditor && (
            <>
              <div className="admin-list-toolbar">
                <label className="admin-search"><span className="sr-only">Search {currentLabel}</span><input placeholder={`Search ${currentLabel.toLowerCase()}…`} value={search} onChange={(event) => setSearch(event.target.value)} /></label>
                <span>{filteredItems.length} {filteredItems.length === 1 ? "item" : "items"} · Drag a row to reorder</span>
              </div>
              {filteredItems.length ? (
                <div className="admin-record-list">
                  {filteredItems.map((item) => (
                    <article key={item.id} className="admin-record" draggable={activeTab !== "trash"} onDragStart={() => setDraggedId(item.id)} onDragOver={(event) => event.preventDefault()} onDrop={() => reorder(item.id)}>
                      <span className="admin-drag-handle" aria-hidden="true">⠿</span>
                      <div className="admin-record-copy"><span className="admin-record-meta">{item.status} · {item.visible ? "visible" : "hidden"}</span><h2>{item.title}</h2><p>{item.data?.description || item.data?.date || JSON.stringify(item.data).slice(0, 150) || "No details added yet."}</p></div>
                      {activeTab === "trash" ? <button className="admin-button admin-button-muted" onClick={() => restoreItem(item)}>Restore</button> : <div className="admin-record-actions"><button className="admin-text-button" onClick={() => startEdit(item)}>Edit</button><button className="admin-text-button admin-danger" onClick={() => deleteItem(item)}>Delete</button></div>}
                    </article>
                  ))}
                </div>
              ) : <div className="admin-empty"><span>Nothing here yet</span><p>Create an item or try a different search.</p></div>}
            </>
          )}

          {activeTab === "submissions" && (
            <div className="admin-utility-panel">
              <div className="admin-list-toolbar"><label className="admin-search"><span className="sr-only">Search submissions</span><input placeholder="Search submissions…" value={search} onChange={(event) => setSearch(event.target.value)} /></label><button className="admin-button admin-button-muted" onClick={exportCsv}>Export CSV</button></div>
              {inbox.filter((item) => JSON.stringify(item.data).toLowerCase().includes(search.toLowerCase())).map((item) => <article className={`admin-submission ${item.is_read ? "" : "unread"}`} key={item.id}><div><span className="admin-record-meta">{new Date(item.created_at).toLocaleString()} · {item.is_read ? "read" : "unread"}</span><h2>{item.data.name}</h2><a href={`mailto:${encodeURIComponent(item.data.email)}`}>{item.data.email}</a><p>{item.data.message}</p></div><div className="admin-record-actions"><button className="admin-text-button" onClick={() => updateSubmission(item)}>{item.is_read ? "Mark unread" : "Mark read"}</button><button className="admin-text-button admin-danger" onClick={() => updateSubmission(item, true)}>Delete</button></div></article>)}
                  {!inbox.length && <div className="admin-empty"><span>No form submissions</span><p>New submissions will appear here.</p></div>}
            </div>
          )}

          {activeTab === "activity" && <div className="admin-utility-panel">{activity.map((entry) => <article className="admin-audit-row" key={entry.id}><span>{new Date(entry.created_at).toLocaleString()}</span><strong>{entry.user_id}</strong><p>{entry.action} <b>{entry.item_type}</b>{entry.item_id ? ` · ${entry.item_id}` : ""}</p></article>)}{!activity.length && <div className="admin-empty"><span>No activity recorded</span><p>Admin actions will be listed here.</p></div>}</div>}

          {activeTab === "users" && (
            <div className="admin-utility-panel">
              {user.role === "superadmin" ? (
                <div style={{
                  background: "linear-gradient(135deg, rgba(245, 158, 11, 0.08), rgba(217, 119, 6, 0.04))",
                  border: "1px solid rgba(245, 158, 11, 0.25)",
                  borderRadius: "10px",
                  padding: "16px 20px",
                  marginBottom: "20px"
                }}>
                  <h3 style={{ margin: "0 0 6px 0", color: "#b45309", fontWeight: 700, display: "flex", alignItems: "center", gap: "8px" }}>
                    👑 Beyond Admin Console
                  </h3>
                  <p style={{ margin: 0, fontSize: "13.5px", color: "#92400e" }}>
                    You have master access to manage committee members, assign roles (Admin, Editor, Member), and grant administrator privileges.
                  </p>
                </div>
              ) : (
                <div style={{
                  background: "#f8fafc",
                  border: "1px solid #e2e8f0",
                  borderRadius: "10px",
                  padding: "16px 20px",
                  marginBottom: "20px"
                }}>
                  <h3 style={{ margin: "0 0 6px 0", color: "#334155", fontWeight: 700, display: "flex", alignItems: "center", gap: "8px" }}>
                    🔒 Role Assignment Protected
                  </h3>
                  <p style={{ margin: 0, fontSize: "13.5px", color: "#64748b" }}>
                    Only Beyond Admin <strong>Awdhesh Chorghade</strong> (<code>awdheshchorghade.etc24@sbjit.edu.in</code>) has permission to grant or change administrator privileges.
                  </p>
                </div>
              )}

              {user.role === "superadmin" && (
                <form className="admin-user-form" onSubmit={createUser}>
                  <h2>Grant member access</h2>
                  <label>
                    Email / Member ID
                    <input
                      required
                      placeholder="e.g. member.etc24@sbjit.edu.in"
                      value={newUser.id}
                      onChange={(event) => setNewUser({ ...newUser, id: event.target.value })}
                    />
                  </label>
                  <label>
                    Password (12+ characters)
                    <input
                      required
                      minLength="12"
                      type="password"
                      placeholder="Enter secure password"
                      value={newUser.password}
                      onChange={(event) => setNewUser({ ...newUser, password: event.target.value })}
                    />
                  </label>
                  <label>
                    Role
                    <select value={newUser.role} onChange={(event) => setNewUser({ ...newUser, role: event.target.value })}>
                      <option value="editor">Editor</option>
                      <option value="admin">Administrator</option>
                      <option value="member">Member</option>
                    </select>
                  </label>
                  <button className="admin-button">Grant access</button>
                </form>
              )}

              <div className="admin-user-list">
                {users.map((entry) => (
                  <article className="admin-audit-row" key={entry.id}>
                    <div>
                      <strong>{entry.full_name || entry.email || entry.id}</strong>
                      <div style={{ fontSize: "12px", color: "#64748b" }}>{entry.email}</div>
                    </div>
                    <label>
                      Role
                      <select
                        disabled={user.role !== "superadmin"}
                        value={entry.role}
                        onChange={async (event) => {
                          try {
                            await api(`/users/${encodeURIComponent(entry.id)}`, {
                              method: "PATCH",
                              body: JSON.stringify({ role: event.target.value, active: Boolean(entry.active) })
                            });
                            await loadTab();
                            notify("User role updated.");
                          } catch (error) {
                            notify(error.message, "error");
                          }
                        }}
                      >
                        <option value="superadmin">👑 Beyond Admin</option>
                        <option value="admin">🛡️ Administrator</option>
                        <option value="editor">Editor</option>
                        <option value="member">Member</option>
                      </select>
                    </label>
                    <label className="admin-checkbox">
                      <input
                        type="checkbox"
                        disabled={user.role !== "superadmin" || entry.role === "superadmin"}
                        checked={Boolean(entry.active)}
                        onChange={async (event) => {
                          try {
                            await api(`/users/${encodeURIComponent(entry.id)}`, {
                              method: "PATCH",
                              body: JSON.stringify({ role: entry.role, active: event.target.checked })
                            });
                            await loadTab();
                            notify("User access updated.");
                          } catch (error) {
                            notify(error.message, "error");
                          }
                        }}
                      />
                      Active
                    </label>
                  </article>
                ))}
              </div>
            </div>
          )}

          {activeTab === "backup" && <div className="admin-backup-panel"><div><span className="admin-kicker">Your content, portable</span><h2>Keep a copy of your content.</h2><p>Export all managed content and form submissions to a JSON file, or import records from a previous export. Uploaded image files are stored separately in the server’s public/uploads folder.</p><div className="admin-backup-actions"><button className="admin-button" onClick={exportBackup}>Download JSON backup</button><label className="admin-button admin-button-muted">Import JSON backup<input type="file" accept="application/json,.json" hidden onChange={(event) => event.target.files?.[0] && importBackup(event.target.files[0])} /></label></div></div></div>}
        </section>
      </div>
    </div>
  );
}
