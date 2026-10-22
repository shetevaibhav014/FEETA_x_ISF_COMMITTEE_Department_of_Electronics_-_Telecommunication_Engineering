import { createServer } from "node:http";
import { DatabaseSync } from "node:sqlite";
import { randomBytes, scryptSync, timingSafeEqual, createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { basename, dirname, extname, join, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL(".", import.meta.url));
try {
  process.loadEnvFile?.(join(root, ".env"));
} catch {}
const dataDir = join(root, "data");
const uploadDir = join(root, "public", "uploads");
const distDir = join(root, "dist");
await mkdir(dataDir, { recursive: true });
await mkdir(uploadDir, { recursive: true });

const sqlitePath = process.env.SQLITE_PATH || join(dataDir, "feeta.sqlite");
await mkdir(dirname(sqlitePath), { recursive: true });
const db = new DatabaseSync(sqlitePath);
db.exec(`
  PRAGMA journal_mode = WAL;
  PRAGMA foreign_keys = ON;
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY, password_hash TEXT NOT NULL, role TEXT NOT NULL DEFAULT 'admin',
    active INTEGER NOT NULL DEFAULT 1, created_at TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS sessions (
    token_hash TEXT PRIMARY KEY, user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    expires_at INTEGER NOT NULL
  );
  CREATE TABLE IF NOT EXISTS content (
    id TEXT PRIMARY KEY, type TEXT NOT NULL, title TEXT NOT NULL, data TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'draft', publish_at TEXT, expires_at TEXT,
    visible INTEGER NOT NULL DEFAULT 1, position INTEGER NOT NULL DEFAULT 0,
    deleted_at TEXT, created_at TEXT NOT NULL, updated_at TEXT NOT NULL, created_by TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS submissions (
    id TEXT PRIMARY KEY, data TEXT NOT NULL, is_read INTEGER NOT NULL DEFAULT 0,
    deleted_at TEXT, created_at TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS activity (
    id INTEGER PRIMARY KEY AUTOINCREMENT, user_id TEXT NOT NULL, action TEXT NOT NULL,
    item_type TEXT NOT NULL, item_id TEXT, created_at TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS site_meta (
    key TEXT PRIMARY KEY, value TEXT NOT NULL
  );
`);
db.prepare("DELETE FROM content WHERE deleted_at IS NOT NULL AND deleted_at <= ?")
  .run(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString());
db.prepare("DELETE FROM submissions WHERE deleted_at IS NOT NULL AND deleted_at <= ?")
  .run(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString());
db.prepare("DELETE FROM sessions WHERE expires_at <= ?").run(Date.now());
const purgeTrash = () => {
  const cutoff = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
  db.prepare("DELETE FROM content WHERE deleted_at IS NOT NULL AND deleted_at <= ?").run(cutoff);
  db.prepare("DELETE FROM submissions WHERE deleted_at IS NOT NULL AND deleted_at <= ?").run(cutoff);
  db.prepare("DELETE FROM sessions WHERE expires_at <= ?").run(Date.now());
  for (const [token, session] of sessions) {
    if (session.expiresAt <= Date.now()) sessions.delete(token);
  }
};
const trashPurgeTimer = setInterval(purgeTrash, 60 * 60 * 1000);
trashPurgeTimer.unref();

const defaultAdmins = [
  { id: "awdheshchorghade.etc24@sbjit.edu.in", password: "awdhesh@etc24", role: "superadmin" },
  { id: "tusharthakare.etc24@sbjit.edu.in", password: "tushar@etc24", role: "admin" },
  { id: "vaibhavshete.etc24@sbjit.edu.in", password: "vaibhav@etc24", role: "admin" },
  { id: "yashsite.etc24@sbjit.edu.in", password: "yashsite@etc24", role: "admin" },
  { id: "divyanidaware.etc24@sbjit.edu.in", password: "divyani@etc24", role: "admin" },
];

if (process.env.ADMIN_ID) defaultAdmins[0].id = process.env.ADMIN_ID;
if (process.env.ADMIN_PASSWORD) defaultAdmins[0].password = process.env.ADMIN_PASSWORD;

db.prepare("DELETE FROM users WHERE id NOT IN (?, ?, ?, ?, ?)")
  .run(...defaultAdmins.map((a) => a.id));

for (const admin of defaultAdmins) {
  const existing = db.prepare("SELECT id FROM users WHERE id = ?").get(admin.id);
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(admin.password, salt, 64).toString("hex");
  if (!existing) {
    db.prepare("INSERT INTO users (id, password_hash, role, created_at) VALUES (?, ?, ?, ?)")
      .run(admin.id, `${salt}:${hash}`, admin.role, new Date().toISOString());
    console.info(`Admin account initialized for ${admin.id} (${admin.role}).`);
  } else {
    db.prepare("UPDATE users SET password_hash = ?, role = ? WHERE id = ?")
      .run(`${salt}:${hash}`, admin.role, admin.id);
  }
}

const contentTypes = new Set([
  "hero", "about", "timeline", "team", "events", "gallery", "announcements",
  "resources", "event-popup", "footer", "seo", "legal",
]);
const sessions = new Map();
const failedLogins = new Map();
const submissionAttempts = new Map();
const sessionDuration = 30 * 60 * 1000;
const maxBodyBytes = 8 * 1024 * 1024;
const mimeTypes = new Map([
  ["image/jpeg", ".jpg"], ["image/png", ".png"], ["image/webp", ".webp"],
]);

function json(response, status, value, headers = {}) {
  response.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    "X-Content-Type-Options": "nosniff",
    ...headers,
  });
  response.end(JSON.stringify(value));
}

function readBody(request, limit = maxBodyBytes) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;
    request.on("data", (chunk) => {
      size += chunk.length;
      if (size > limit) {
        reject(Object.assign(new Error("Request body is too large."), { status: 413 }));
        request.destroy();
        return;
      }
      chunks.push(chunk);
    });
    request.on("end", () => resolve(Buffer.concat(chunks)));
    request.on("error", reject);
  });
}

async function readJson(request) {
  try {
    return JSON.parse((await readBody(request)).toString("utf8"));
  } catch (error) {
    if (error.status) throw error;
    throw Object.assign(new Error("Request body must be valid JSON."), { status: 400 });
  }
}

function cookieValue(request, name) {
  const part = (request.headers.cookie || "").split(";").map((value) => value.trim())
    .find((value) => value.startsWith(`${name}=`));
  return part ? decodeURIComponent(part.slice(name.length + 1)) : "";
}

function sessionFor(request) {
  const token = cookieValue(request, "feeta_session");
  const session = sessions.get(token);
  if (!session || session.expiresAt <= Date.now()) {
    if (token) sessions.delete(token);
    return null;
  }
  const account = db.prepare("SELECT role, active FROM users WHERE id = ?").get(session.id);
  if (!account?.active) {
    sessions.delete(token);
    db.prepare("DELETE FROM sessions WHERE token_hash = ?")
      .run(createHash("sha256").update(token).digest("hex"));
    return null;
  }
  session.role = account.role;
  session.expiresAt = Date.now() + sessionDuration;
  db.prepare("UPDATE sessions SET expires_at = ? WHERE token_hash = ?")
    .run(session.expiresAt, createHash("sha256").update(token).digest("hex"));
  return session;
}

function requireSession(request, response, adminOnly = false) {
  const session = sessionFor(request);
  if (!session) {
    json(response, 401, { error: "Please sign in to continue." });
    return null;
  }
  if (adminOnly && session.role !== "admin") {
    json(response, 403, { error: "Administrator access is required." });
    return null;
  }
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  response.setHeader("Set-Cookie", `feeta_session=${cookieValue(request, "feeta_session")}; HttpOnly; SameSite=Strict; Path=/; Max-Age=1800${secure}`);
  return session;
}

function audit(userId, action, type, itemId = null) {
  db.prepare("INSERT INTO activity (user_id, action, item_type, item_id, created_at) VALUES (?, ?, ?, ?, ?)")
    .run(userId, action, type, itemId, new Date().toISOString());
}

function transaction(work) {
  db.exec("BEGIN IMMEDIATE");
  try {
    const result = work();
    db.exec("COMMIT");
    return result;
  } catch (error) {
    db.exec("ROLLBACK");
    throw error;
  }
}

function toPublicContent(row) {
  return { ...row, data: JSON.parse(row.data), visible: Boolean(row.visible) };
}

function validOrigin(request) {
  const origin = request.headers.origin;
  if (!origin) return request.method === "GET" || request.method === "HEAD";
  try {
    const originHost = new URL(origin).host;
    return originHost === request.headers.host ||
      originHost.startsWith("localhost:") ||
      originHost.startsWith("127.0.0.1:");
  } catch {
    return false;
  }
}

const server = createServer(async (request, response) => {
  const url = new URL(request.url || "/", `http://${request.headers.host || "localhost"}`);
  const { pathname } = url;
  const method = request.method || "GET";

  if (pathname === "/api/health" && method === "GET") {
    return json(response, 200, { ok: true });
  }
  const publicContentMatch = pathname.match(/^\/api\/public-content\/([a-z-]+)$/);
  if (publicContentMatch && method === "GET") {
    const type = publicContentMatch[1];
    if (!contentTypes.has(type)) return json(response, 400, { error: "Unknown content type." });
    const now = new Date().toISOString();
    const rows = db.prepare(`SELECT * FROM content WHERE type = ? AND status = 'published'
      AND visible = 1 AND deleted_at IS NULL
      AND (publish_at IS NULL OR publish_at <= ?)
      AND (expires_at IS NULL OR expires_at > ?)
      ORDER BY position, created_at DESC`).all(type, now, now);
    const seeded = db.prepare("SELECT value FROM site_meta WHERE key = 'default_content_seeded'").get();
    return json(response, 200, { initialized: seeded?.value === "true", items: rows.map(toPublicContent) });
  }
  if (pathname.startsWith("/api/") && !validOrigin(request)) {
    return json(response, 403, { error: "Request origin is not allowed." });
  }
  try {
    if (pathname === "/api/auth/login" && method === "POST") {
      const ip = request.socket.remoteAddress || "unknown";
      const recentFailures = failedLogins.get(ip) || [];
      const stillBlocked = recentFailures.filter((time) => Date.now() - time < 15 * 60 * 1000);
      if (stillBlocked.length >= 10) return json(response, 429, { error: "Too many attempts. Try again later." });

      const body = await readJson(request);
      const user = db.prepare("SELECT id, password_hash, role FROM users WHERE id = ? AND active = 1")
        .get(String(body.id || ""));
      let accepted = false;
      if (user) {
        const [salt, savedHash] = user.password_hash.split(":");
        const candidate = scryptSync(String(body.password || ""), salt, 64);
        accepted = timingSafeEqual(candidate, Buffer.from(savedHash, "hex"));
      }
      if (!accepted) {
        failedLogins.set(ip, [...stillBlocked, Date.now()]);
        return json(response, 401, { error: "The ID or password is incorrect." });
      }
      failedLogins.delete(ip);
      const token = randomBytes(32).toString("base64url");
      const expiresAt = Date.now() + sessionDuration;
      const tokenHash = createHash("sha256").update(token).digest("hex");
      sessions.set(token, { id: user.id, role: user.role, expiresAt });
      db.prepare("INSERT INTO sessions (token_hash, user_id, expires_at) VALUES (?, ?, ?)")
        .run(tokenHash, user.id, expiresAt);
      audit(user.id, "signed in", "session");
      const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
      return json(response, 200, { user: { id: user.id, role: user.role } }, {
        "Set-Cookie": `feeta_session=${token}; HttpOnly; SameSite=Strict; Path=/; Max-Age=1800${secure}`,
      });
    }

    if (pathname === "/api/auth/session" && method === "GET") {
      const session = requireSession(request, response);
      if (session) return json(response, 200, { user: { id: session.id, role: session.role } });
      return;
    }
    if (pathname === "/api/auth/logout" && method === "POST") {
      const token = cookieValue(request, "feeta_session");
      if (token) {
        const hash = createHash("sha256").update(token).digest("hex");
        db.prepare("DELETE FROM sessions WHERE token_hash = ?").run(hash);
        sessions.delete(token);
      }
      return json(response, 200, { ok: true }, {
        "Set-Cookie": "feeta_session=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0",
      });
    }

    if (pathname === "/api/seed-status" && method === "GET") {
      if (!requireSession(request, response, true)) return;
      const setting = db.prepare("SELECT value FROM site_meta WHERE key = 'default_content_seeded'").get();
      return json(response, 200, { initialized: setting?.value === "true" });
    }
    if (pathname === "/api/seed-content" && method === "POST") {
      const session = requireSession(request, response, true);
      if (!session) return;
      const body = await readJson(request);
      if (!Array.isArray(body.records) || body.records.length > 500
        || body.records.some((item) => !contentTypes.has(item.type) || !String(item.title || "").trim()
          || !item.data || typeof item.data !== "object" || Array.isArray(item.data))) {
        return json(response, 400, { error: "Initial website content is invalid." });
      }
      const count = transaction(() => {
        const setting = db.prepare("SELECT value FROM site_meta WHERE key = 'default_content_seeded'").get();
        if (setting?.value === "true") return 0;
        const insert = db.prepare(`INSERT INTO content
          (id, type, title, data, status, visible, position, created_at, updated_at, created_by)
          VALUES (?, ?, ?, ?, 'published', 1, ?, ?, ?, ?)`);
        const now = new Date().toISOString();
        body.records.forEach((item, index) => insert.run(
          randomBytes(12).toString("hex"), item.type, String(item.title).trim(), JSON.stringify(item.data),
          Number.isInteger(item.position) ? item.position : index, now, now, session.id,
        ));
        db.prepare("INSERT OR REPLACE INTO site_meta (key, value) VALUES ('default_content_seeded', 'true')").run();
        return body.records.length;
      });
      if (count) audit(session.id, "imported existing website content", "content");
      return json(response, 200, { initialized: true, imported: count });
    }

    if (pathname === "/api/content" && method === "GET") {
      const session = requireSession(request, response);
      if (!session) return;
      const type = url.searchParams.get("type");
      if (type && !contentTypes.has(type)) return json(response, 400, { error: "Unknown content type." });
      const trash = url.searchParams.get("trash") === "true";
      const where = [trash ? "deleted_at IS NOT NULL" : "deleted_at IS NULL"];
      const args = [];
      if (type) {
        where.push("type = ?");
        args.push(type);
      }
      const rows = db.prepare(`SELECT * FROM content WHERE ${where.join(" AND ")} ORDER BY position, created_at DESC`)
        .all(...args);
      return json(response, 200, rows.map(toPublicContent));
    }
    if (pathname === "/api/content" && method === "POST") {
      const session = requireSession(request, response);
      if (!session) return;
      const body = await readJson(request);
      if (!contentTypes.has(body.type) || !String(body.title || "").trim()) {
        return json(response, 400, { error: "Choose a manager and enter a title." });
      }
      const id = randomBytes(12).toString("hex");
      const now = new Date().toISOString();
      db.prepare(`INSERT INTO content
        (id, type, title, data, status, publish_at, expires_at, visible, position, created_at, updated_at, created_by)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
        .run(id, body.type, String(body.title).trim(), JSON.stringify(body.data || {}),
          body.status === "published" ? "published" : "draft", body.publishAt || null,
          body.expiresAt || null, body.visible === false ? 0 : 1, Number(body.position) || 0,
          now, now, session.id);
      audit(session.id, "created", body.type, id);
      return json(response, 201, toPublicContent(db.prepare("SELECT * FROM content WHERE id = ?").get(id)));
    }
    const contentMatch = pathname.match(/^\/api\/content\/([a-f0-9]+)$/);
    if (contentMatch && method === "PUT") {
      const session = requireSession(request, response);
      if (!session) return;
      const body = await readJson(request);
      const existing = db.prepare("SELECT * FROM content WHERE id = ? AND deleted_at IS NULL").get(contentMatch[1]);
      if (!existing) return json(response, 404, { error: "Content not found." });
      db.prepare(`UPDATE content SET title = ?, data = ?, status = ?, publish_at = ?, expires_at = ?,
        visible = ?, updated_at = ? WHERE id = ?`)
        .run(String(body.title || existing.title).trim(), JSON.stringify(body.data || {}),
          body.status === "published" ? "published" : "draft", body.publishAt || null,
          body.expiresAt || null, body.visible === false ? 0 : 1, new Date().toISOString(), existing.id);
      audit(session.id, "updated", existing.type, existing.id);
      return json(response, 200, toPublicContent(db.prepare("SELECT * FROM content WHERE id = ?").get(existing.id)));
    }
    if (contentMatch && method === "DELETE") {
      const session = requireSession(request, response);
      if (!session) return;
      const existing = db.prepare("SELECT type FROM content WHERE id = ? AND deleted_at IS NULL").get(contentMatch[1]);
      if (!existing) return json(response, 404, { error: "Content not found." });
      db.prepare("UPDATE content SET deleted_at = ?, updated_at = ? WHERE id = ?")
        .run(new Date().toISOString(), new Date().toISOString(), contentMatch[1]);
      audit(session.id, "moved to trash", existing.type, contentMatch[1]);
      return json(response, 200, { ok: true });
    }
    const restoreMatch = pathname.match(/^\/api\/content\/([a-f0-9]+)\/restore$/);
    if (restoreMatch && method === "POST") {
      const session = requireSession(request, response);
      if (!session) return;
      const row = db.prepare("SELECT type FROM content WHERE id = ? AND deleted_at IS NOT NULL").get(restoreMatch[1]);
      if (!row) return json(response, 404, { error: "Trash item not found." });
      db.prepare("UPDATE content SET deleted_at = NULL, updated_at = ? WHERE id = ?")
        .run(new Date().toISOString(), restoreMatch[1]);
      audit(session.id, "restored", row.type, restoreMatch[1]);
      return json(response, 200, { ok: true });
    }
    if (pathname === "/api/content/reorder" && method === "POST") {
      const session = requireSession(request, response);
      if (!session) return;
      const body = await readJson(request);
      if (!Array.isArray(body.ids) || !contentTypes.has(body.type)) return json(response, 400, { error: "Invalid order." });
      const update = db.prepare("UPDATE content SET position = ?, updated_at = ? WHERE id = ? AND type = ? AND deleted_at IS NULL");
      transaction(() => body.ids.forEach((id, index) =>
        update.run(index, new Date().toISOString(), id, body.type)));
      audit(session.id, "reordered", body.type);
      return json(response, 200, { ok: true });
    }

    if (pathname === "/api/forms" && method === "POST") {
      const ip = request.socket.remoteAddress || "unknown";
      const recentSubmissions = (submissionAttempts.get(ip) || []).filter((time) => Date.now() - time < 15 * 60 * 1000);
      if (recentSubmissions.length >= 5) return json(response, 429, { error: "Too many messages. Please try again later." });
      const body = await readJson(request);
      if (!String(body.name || "").trim() || String(body.name).length > 100
        || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(body.email || ""))
        || String(body.email).length > 254
        || !String(body.message || "").trim() || String(body.message).length > 5000) {
        return json(response, 400, { error: "Name, email, and message are required." });
      }
      submissionAttempts.set(ip, [...recentSubmissions, Date.now()]);
      const id = randomBytes(12).toString("hex");
      db.prepare("INSERT INTO submissions (id, data, created_at) VALUES (?, ?, ?)")
        .run(id, JSON.stringify(body), new Date().toISOString());
      return json(response, 201, { ok: true });
    }
    if (pathname === "/api/forms" && method === "GET") {
      const session = requireSession(request, response);
      if (!session) return;
      const trash = url.searchParams.get("trash") === "true";
      const rows = db.prepare(`SELECT * FROM submissions WHERE deleted_at ${trash ? "IS NOT NULL" : "IS NULL"} ORDER BY created_at DESC`).all();
      return json(response, 200, rows.map((row) => ({ ...row, data: JSON.parse(row.data), is_read: Boolean(row.is_read) })));
    }
    const formMatch = pathname.match(/^\/api\/forms\/([a-f0-9]+)$/);
    if (formMatch && method === "PATCH") {
      const session = requireSession(request, response);
      if (!session) return;
      const body = await readJson(request);
      const result = db.prepare("UPDATE submissions SET is_read = ? WHERE id = ? AND deleted_at IS NULL")
        .run(body.is_read ? 1 : 0, formMatch[1]);
      if (!result.changes) return json(response, 404, { error: "Submission not found." });
      audit(session.id, "updated submission", "submission", formMatch[1]);
      return json(response, 200, { ok: true });
    }
    if (formMatch && method === "DELETE") {
      const session = requireSession(request, response);
      if (!session) return;
      const result = db.prepare("UPDATE submissions SET deleted_at = ? WHERE id = ? AND deleted_at IS NULL")
        .run(new Date().toISOString(), formMatch[1]);
      if (!result.changes) return json(response, 404, { error: "Submission not found." });
      audit(session.id, "moved submission to trash", "submission", formMatch[1]);
      return json(response, 200, { ok: true });
    }
    const formRestoreMatch = pathname.match(/^\/api\/forms\/([a-f0-9]+)\/restore$/);
    if (formRestoreMatch && method === "POST") {
      const session = requireSession(request, response);
      if (!session) return;
      const result = db.prepare("UPDATE submissions SET deleted_at = NULL WHERE id = ? AND deleted_at IS NOT NULL")
        .run(formRestoreMatch[1]);
      if (!result.changes) return json(response, 404, { error: "Submission not found in trash." });
      audit(session.id, "restored submission", "submission", formRestoreMatch[1]);
      return json(response, 200, { ok: true });
    }

    if (pathname === "/api/activity" && method === "GET") {
      if (!requireSession(request, response, true)) return;
      return json(response, 200, db.prepare("SELECT * FROM activity ORDER BY created_at DESC LIMIT 300").all());
    }
    if (pathname === "/api/users" && method === "GET") {
      if (!requireSession(request, response, true)) return;
      return json(response, 200, db.prepare("SELECT id, role, active, created_at FROM users ORDER BY created_at").all());
    }
    if (pathname === "/api/users" && method === "POST") {
      const session = requireSession(request, response, true);
      if (!session) return;
      const body = await readJson(request);
      if (!/^[a-zA-Z0-9._@-]{3,80}$/.test(String(body.id || "")) || String(body.password || "").length < 12) {
        return json(response, 400, { error: "Use an ID of 3-80 characters and a password of at least 12 characters." });
      }
      if (!["admin", "editor"].includes(body.role)) return json(response, 400, { error: "Choose admin or editor role." });
      const salt = randomBytes(16).toString("hex");
      const hash = scryptSync(String(body.password), salt, 64).toString("hex");
      try {
        db.prepare("INSERT INTO users (id, password_hash, role, created_at) VALUES (?, ?, ?, ?)")
          .run(body.id, `${salt}:${hash}`, body.role, new Date().toISOString());
      } catch (error) {
        if (error.code === "SQLITE_CONSTRAINT_PRIMARYKEY") return json(response, 409, { error: "That ID already exists." });
        throw error;
      }
      audit(session.id, "created user", "user", body.id);
      return json(response, 201, { id: body.id, role: body.role, active: 1 });
    }
    const userMatch = pathname.match(/^\/api\/users\/([a-zA-Z0-9._@-]+)$/);
    if (userMatch && method === "PATCH") {
      const session = requireSession(request, response, true);
      if (!session) return;
      const body = await readJson(request);
      if (!["admin", "editor"].includes(body.role) || ![true, false].includes(body.active)) {
        return json(response, 400, { error: "Choose a valid role and active state." });
      }
      if (userMatch[1] === session.id && (!body.active || body.role !== "admin")) {
        return json(response, 400, { error: "You cannot disable or demote your own account." });
      }
      const result = db.prepare("UPDATE users SET role = ?, active = ? WHERE id = ?")
        .run(body.role, body.active ? 1 : 0, userMatch[1]);
      if (!result.changes) return json(response, 404, { error: "User not found." });
      audit(session.id, "updated user role", "user", userMatch[1]);
      return json(response, 200, { ok: true });
    }

    if (pathname === "/api/backup" && method === "GET") {
      const session = requireSession(request, response, true);
      if (!session) return;
      const backup = {
        exportedAt: new Date().toISOString(),
        content: db.prepare("SELECT * FROM content").all().map(toPublicContent),
        submissions: db.prepare("SELECT * FROM submissions").all().map((row) => ({ ...row, data: JSON.parse(row.data) })),
      };
      audit(session.id, "exported backup", "backup");
      return json(response, 200, backup, {
        "Content-Disposition": `attachment; filename="feeta-backup-${new Date().toISOString().slice(0, 10)}.json"`,
      });
    }
    if (pathname === "/api/backup" && method === "POST") {
      const session = requireSession(request, response, true);
      if (!session) return;
      const body = await readJson(request);
      if (!Array.isArray(body.content)) return json(response, 400, { error: "This backup file is not valid." });
      const insert = db.prepare(`INSERT OR IGNORE INTO content
        (id, type, title, data, status, publish_at, expires_at, visible, position, deleted_at, created_at, updated_at, created_by)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
      const imported = transaction(() => {
        let imported = 0;
        for (const item of body.content) {
          if (!contentTypes.has(item.type) || !item.id || !item.title) continue;
          const result = insert.run(item.id, item.type, item.title, JSON.stringify(item.data || {}), item.status || "draft",
            item.publish_at || null, item.expires_at || null, item.visible === false ? 0 : 1,
            Number(item.position) || 0, item.deleted_at || null, item.created_at || new Date().toISOString(),
            new Date().toISOString(), session.id);
          imported += result.changes;
        }
        return imported;
      });
      const insertSubmission = db.prepare("INSERT OR IGNORE INTO submissions (id, data, is_read, deleted_at, created_at) VALUES (?, ?, ?, ?, ?)");
      const importedSubmissions = Array.isArray(body.submissions) ? transaction(() =>
        body.submissions.reduce((count, item) => {
          if (!item.id || !item.data) return count;
          return count + insertSubmission.run(item.id, JSON.stringify(item.data), item.is_read ? 1 : 0,
            item.deleted_at || null, item.created_at || new Date().toISOString()).changes;
        }, 0)) : 0;
      db.prepare("INSERT OR REPLACE INTO site_meta (key, value) VALUES ('default_content_seeded', 'true')").run();
      audit(session.id, "restored backup content", "backup");
      return json(response, 200, { imported, importedSubmissions });
    }

    if (pathname === "/api/upload" && method === "POST") {
      if (!requireSession(request, response)) return;
      const alt = url.searchParams.get("alt");
      if (!alt?.trim()) return json(response, 400, { error: "Alternative text is required." });
      const ext = mimeTypes.get(request.headers["content-type"] || "");
      if (!ext) return json(response, 415, { error: "Upload a JPEG, PNG, or WebP image." });
      const body = await readBody(request, 4 * 1024 * 1024);
      if (!body.length) return json(response, 400, { error: "The image is empty." });
      const filename = `${randomBytes(16).toString("hex")}${ext}`;
      await writeFile(join(uploadDir, filename), body, { flag: "wx" });
      return json(response, 201, { url: `/uploads/${filename}`, alt: alt.trim() });
    }
    if (pathname.startsWith("/uploads/") && method === "GET") {
      const name = basename(pathname);
      const ext = extname(name).toLowerCase();
      if (!/^[a-f0-9]{32}$/.test(name.slice(0, -ext.length)) || ![".jpg", ".png", ".webp"].includes(ext)) {
        return json(response, 404, { error: "Image not found." });
      }
      const bytes = await readFile(join(uploadDir, name));
      response.writeHead(200, { "Content-Type": [...mimeTypes].find((entry) => entry[1] === ext)?.[0],
        "Cache-Control": "public, max-age=31536000, immutable", "X-Content-Type-Options": "nosniff" });
      return response.end(bytes);
    }

    if ((method === "GET" || method === "HEAD") && !pathname.startsWith("/api/")) {
      let requestedPath;
      try {
        const decodedPath = decodeURIComponent(pathname);
        const filePath = decodedPath.endsWith("/") ? `${decodedPath}index.html` : decodedPath;
        requestedPath = resolve(distDir, `.${filePath}`);
      } catch {
        return json(response, 400, { error: "Invalid path." });
      }
      const safePath = requestedPath.startsWith(`${distDir}${sep}`) ? requestedPath : join(distDir, "index.html");
      let filePath = safePath;
      try {
        const file = await readFile(filePath);
        const ext = extname(filePath).toLowerCase();
        const types = new Map([
          [".html", "text/html; charset=utf-8"], [".js", "text/javascript; charset=utf-8"],
          [".css", "text/css; charset=utf-8"], [".svg", "image/svg+xml"],
          [".png", "image/png"], [".jpg", "image/jpeg"], [".jpeg", "image/jpeg"],
          [".webp", "image/webp"], [".ico", "image/x-icon"], [".json", "application/json; charset=utf-8"],
          [".woff2", "font/woff2"], [".woff", "font/woff"],
        ]);
        response.writeHead(200, { "Content-Type": types.get(ext) || "application/octet-stream",
          "Cache-Control": ext === ".html" ? "no-cache" : "public, max-age=31536000, immutable",
          "X-Content-Type-Options": "nosniff" });
        return method === "HEAD" ? response.end() : response.end(file);
      } catch (error) {
        if (error.code !== "ENOENT") throw error;
        filePath = join(distDir, "index.html");
        try {
          const file = await readFile(filePath);
          response.writeHead(200, { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-cache",
            "X-Content-Type-Options": "nosniff" });
          return method === "HEAD" ? response.end() : response.end(file);
        } catch (indexError) {
          if (indexError.code !== "ENOENT") throw indexError;
          return json(response, 503, { error: "Build the website first with npm run build." });
        }
      }
    }

    return json(response, 404, { error: "Not found." });
  } catch (error) {
    if (error.status) return json(response, error.status, { error: error.message });
    console.error("API request failed:", error);
    return json(response, 500, { error: "The server could not complete the request." });
  }
});

const port = Number(process.env.PORT || 4177);
server.listen(port, () => console.info(`FEETA SQLite API listening at http://localhost:${port}`));
