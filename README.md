# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Admin credentials & security

- Default seeded admin username: `admin` and password: `admin123` (override using env var `ADMIN_DEFAULT_PASSWORD` before first run).
- Set `JWT_SECRET` in your environment for production; do not use the default secret.
- Password reset flow: the server issues one-time tokens stored in the database. In development the token is logged and returned when `DEV_SHOW_TOKEN=true` for convenience. In production you must configure email delivery and the server will not return tokens in responses.
- To change password as a logged-in admin: open `/admin` → Settings → Change Admin Password.

Email delivery & CLI
- Configure SMTP to have the server email password reset tokens instead of returning them in responses. Set these env vars:
	- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` (optional `MAIL_FROM`, `DOMAIN`)
- By default the server will not return tokens in API responses unless `DEV_SHOW_TOKEN=true` is set. This prevents accidental token exposure when running non-production builds.
- You can create or rotate an admin password from the server folder using the included CLI:

```
cd server
npm run create-admin -- <username> <password>
```

If you do not provide args, the script will prompt for them interactively.

Password reset (locked-out) workflow
- On the login page click "Forgot password?" and enter the `System ID` (username). The server will issue a one-time reset token.
- In development the token is returned in the response (and logged) when `DEV_SHOW_TOKEN=true` for convenience. Copy that token.
- Click "Have a reset token? Use it" on the login card and paste the token plus a new password to complete the reset.
- In production, configure an email provider so the server emails the token to the admin account instead of returning it in responses.

Recommended environment variables (example `.env`):

```
JWT_SECRET=your_strong_jwt_secret_here
ADMIN_DEFAULT_PASSWORD=someSecurePass123!
DEV_SHOW_TOKEN=true # only for development
```
