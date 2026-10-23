# Projects Configuration

- **Tashkent Caravan**:
  - Folder: `tashkent-caravan`
  - GitHub Repo: `https://github.com/Leo9598/tashkent-caravan.git`
  - Live Site: `tashkent-caravan.vercel.app`

- **Crosta Kitchen**:
  - Folder: `site`
  - GitHub Repo: `https://github.com/Leo9598/crosta-site.git`
  - Live Site: `crosta.kitchen` (Hosted on VPS via Express `server.js` behind Cloudflare; preview at `crosta-site.vercel.app`)

When requested to update menu items, prices, styling, or layout, make the edits in the corresponding project and push to GitHub. If updating the VPS directly, pull `main` on the server and restart the Node/PM2 process.