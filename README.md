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

Do NOT store real admin credentials or secrets in `README.md` or any committed files. The project seeds an admin account if none exists — ensure you set a secure initial password via environment variables before first run and rotate it after deployment.

- Always set `JWT_SECRET` in your environment for production; never use default secrets.
- Configure email (SMTP) for password reset delivery in production; do not enable dev token returns in production.
- Use the provided CLI to create or rotate admin users from the `server` folder (the CLI will prompt if arguments are omitted):

```bash
cd server
npm run create-admin -- <username> <password>
```

Recommended env vars are listed in `.env.example`.
