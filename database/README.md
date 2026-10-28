# Crosta staff dashboard

The dashboard is at `/staff/`. It starts locked until the approved owner account is created. The public demo uses fictitious reservations and reviews in browser memory; no demo changes reach the API or database. Future owner-only controls can use the existing staff role field and separate routes.

## Activation after owner and staff emails are supplied

On the existing VPS, run in an interactive terminal:

```sh
cd /var/www/crosta.kitchen
node scripts/staff-user.cjs create OWNER_EMAIL "Owner name" owner
```

The owner enters a new password privately in the terminal, twice. The password is never displayed or put in command history. Minimum length: 12 characters. Creating the first owner enables saving new website reservations and reviews. Add each approved staff account with the same command ending in `staff`. There is no public signup. Staff accounts use separate credentials.

To revoke an account and all of its sessions:

```sh
node scripts/staff-user.cjs disable STAFF_EMAIL
```

## Storage and operations

- Node 22.13+ is required for the built-in SQLite module; the current server is Node 22.23.1. No new package dependencies are required.
- The database is outside the website root: `~/.local/share/crosta/staff.sqlite` for the service account. Directory permissions are 0700 and the database is 0600. `CROSTA_PRIVATE_DIR` can select another private directory. Never point it at the public checkout.
- Sessions are opaque random tokens stored as hashes, expire after eight hours, and use Secure, HttpOnly, SameSite=Strict cookies. Staff membership is checked on every data request. Deactivation invalidates sessions immediately.
- No owner account exists at initial deployment. `GET /api/staff/session` returns `ready:false`; all private request/history endpoints require a valid staff session. Future owner settings must additionally check `staff.role === 'owner'` on the server.
- Until activation, the existing email request flow remains in use. Gmail authentication previously failed and still needs the restaurant's valid app password. No test emails are sent by the automated checks.
- After activation, requests are committed before email is attempted. Email failure does not discard a saved request; staff see its notification status. Email is best-effort, with no automatic retry. Cached clients can still submit through the existing endpoints.
- Modern clients reuse a request UUID for retries. Duplicate UUIDs with the same payload return the same reference; changed payloads return a conflict. Status transitions and their history are transactional and check the request version to prevent concurrent overwrites.
- Reservation statuses: new → confirmed → seated → completed, with cancellation and a reason. Reviews: new → reviewed → archived. These review states do not publish or remove reviews on the public site.
- Back up the private directory with a SQLite-aware backup or while `crosta.service` is stopped; an active WAL database must not be copied as the main file alone. Define a retention period for guest records before activation.
- Backend changes require `systemctl restart crosta.service`. The service remains the same Express app on port 3005 behind the existing Nginx configuration.

## Checks

`npm test` exercises real HTTP routes with temporary SQLite databases and a stubbed email transport. It verifies locked startup, login/session controls, origin checks, durable submissions, idempotency, notification failure handling, status conflicts, cancellation history, restart persistence, and private-file restrictions. No real account or customer record is created on production by these tests.
