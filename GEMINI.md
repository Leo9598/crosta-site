# Projects Configuration

- **Tashkent Caravan**:
  - Folder: `tashkent-caravan`
  - GitHub Repo: `https://github.com/Leo9598/tashkent-caravan.git`
  - Live Site: `tashkent-caravan.vercel.app`

- **Crosta Kitchen**:
  - Folder: `site`
  - GitHub Repo: `https://github.com/Leo9598/crosta-site.git`
  - Live Site: `crosta.kitchen` (Hosted on VPS via Express `server.js` behind Cloudflare; preview at `crosta-site.vercel.app`)
  - Production checkout: `/var/www/crosta.kitchen` on the existing SSH host `45.11.181.67`
  - Runtime: systemd `crosta.service`; Nginx proxies to Express on `127.0.0.1:3005`
  - Staff dashboard: `https://crosta.kitchen/staff/`; initially locked, with a public fictitious-data demo
  - Private staff data: SQLite outside the website root, default `/root/.local/share/crosta/staff.sqlite` for the current service user. Requires Node 22.13+. See `database/README.md` for account activation, backup, and tests. Do not create owner/staff accounts until the user supplies approved identities and enters their password privately.

When requested to update menu items, prices, styling, or layout, make the edits in the corresponding project and push to GitHub. For Crosta production, verify the tracked server checkout is clean, then pull `main` with `git pull --ff-only origin main`. Express reads static frontend files on each request, so HTML/CSS/JS/image changes do not require a process restart. If backend code or dependencies change, use `systemctl restart crosta.service` and verify it is active. Preserve the server environment file and installed dependencies. PM2 is not used on this server.
