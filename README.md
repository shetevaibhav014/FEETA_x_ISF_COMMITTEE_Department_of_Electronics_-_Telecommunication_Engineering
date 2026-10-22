# FEETA × ISF Department Website

React/Vite public website with a Node.js and SQLite admin service.

## Requirements

- Node.js 22.13 or newer (the API uses Node's built-in `node:sqlite` module)
- npm

## Local development

Open two PowerShell terminals in this project directory.

Terminal 1 — start the SQLite API and create the first administrator account:

```powershell
$env:ADMIN_ID = "your-admin-id"
$env:ADMIN_PASSWORD = "use-a-unique-password-at-least-12-characters"
npm run server
```

The first start creates `data/feeta.sqlite` and stores a scrypt password hash. Keep the database and `public/uploads` on persistent storage, and do not commit either directory. The first admin is only seeded when the database has no users; changing environment variables later does not reset that account.

Terminal 2 — run the website:

```powershell
npm run dev
```

Visit the site and click the ETC logo to reach the hidden admin login. The default Vite development server proxies `/api` and `/uploads` to the SQLite service at port `4177`.

For a production-style single-server run, build the website and start the server:

```powershell
npm run build
$env:ADMIN_ID = "your-admin-id"
$env:ADMIN_PASSWORD = "use-a-unique-password-at-least-12-characters"
$env:NODE_ENV = "production"
npm run server
```

Set `PORT` if the server should listen on a port other than `4177`. The production server serves the Vite build, SPA routes, SQLite API, and uploaded images from one origin. Put it behind HTTPS and a reverse proxy, and mount persistent storage for `data/` and `public/uploads/`. The existing Vercel configuration is for static hosting; Vercel's ephemeral filesystem is not suitable for this SQLite deployment.

## Admin dashboard

The dashboard is at `/admin` and the sign-in route is `/admin/login`. The website navigation does not expose either route; the clickable ETC logo opens sign-in.

Managers cover hero copy and CTAs, About and timeline, team, events, gallery, announcements, resources, event popup, footer, SEO, and legal pages. Items can be drafted or published immediately/scheduled, hidden, searched, reordered by dragging, edited, and moved to trash. Trash is purged after 30 days and can be restored before then. The dashboard also has a submissions inbox with read status and CSV export, admin/editor roles, activity log, JSON backup/restore, and image upload.

On the first admin sign-in, the current hardcoded hero, About copy, members, mentors, events, gallery photos, event popup, and footer details are imported into SQLite so they are immediately editable. This one-time initialization is recorded in the database.

JPG, JPEG, and PNG uploads are resized to at most 1600px and JPEG-compressed in the browser before transfer. Event uploads populate the event poster field; other image managers populate the image field. Add an `alt` field in the record's JSON before uploading; image records cannot be saved without descriptive alternative text. Common content shapes are prefilled in each manager.

Dashboard sessions use HTTP-only, SameSite cookies and expire after 30 minutes of inactivity. Passwords are stored as scrypt hashes. Editors can manage content and submissions; only admins can manage users, access the activity log, or create backups.

## Notes

- Published hero, About, timeline, team, events, gallery, announcements, event popup, footer, SEO, resources, and legal records are read by their corresponding public pages.
- Form submissions are stored in SQLite and limited to five messages per IP per 15 minutes.
- JSON backups include managed content and form submissions. Uploaded image binaries live separately in `public/uploads`; back up that folder too.
- Cookie consent records the visitor's choice. The website currently sets no analytics or advertising cookies.
