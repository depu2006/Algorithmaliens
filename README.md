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

## Migration — copy contacts to Firestore

If you want to migrate existing `contacts` from the local SQLite database to Firestore, follow these steps.

1. Place your Firebase service account JSON in the `server/` folder and rename it to `firebase-service-account.json` (or keep it elsewhere and pass the path). Do NOT commit this file — it's ignored by `.gitignore`.

2. Install dependencies in the `server` folder (if not already installed):

```bash
cd server
npm install
```

3. Run the migration script. You can either pass the service account path as an argument or set the `FIREBASE_SERVICE_ACCOUNT` env var:

```bash
# Using an argument
node scripts/migrate-to-firestore.js ./firebase-service-account.json

# Or using an env var
FIREBASE_SERVICE_ACCOUNT=./firebase-service-account.json node scripts/migrate-to-firestore.js
```

4. The script copies rows from the `contacts` table to the Firestore `contacts` collection preserving common fields and timestamps.

5. Verify migrated documents in the Firebase Console under Firestore.

If you want, I can add a convenience npm script to `server/package.json` (already added) and help run the migration locally.

## Deploying the Frontend to Vercel

This repository contains a Vite React frontend (root) and a separate `server/` Express app that uses SQLite. Deploying to Vercel is straightforward for the frontend static site. Follow these steps:

1. Push your repository to GitHub (or connect repository to Vercel).
2. Go to https://vercel.com and import your Git repository.
	- Framework Preset: select `Vite` or `Other` (the `vercel.json` included uses `@vercel/static-build`).
	- Build Command: `npm run build` (automatically detected)
	- Output Directory: `dist`
3. Add your Firebase client env vars in the Vercel Dashboard (Project Settings → Environment Variables):
	- `VITE_FIREBASE_API_KEY`
	- `VITE_FIREBASE_AUTH_DOMAIN`
	- `VITE_FIREBASE_PROJECT_ID`
	- `VITE_FIREBASE_STORAGE_BUCKET`
	- `VITE_FIREBASE_MESSAGING_SENDER_ID`
	- `VITE_FIREBASE_APP_ID`
	- `VITE_FIREBASE_MEASUREMENT_ID` (optional)
	- `VITE_USE_FIREBASE` (set to `true` to enable client Firestore writes)

Notes about the backend (important):
- The `server/` app uses Express + SQLite and is not directly deployable to Vercel as a long-running process. Options:
  1. Deploy only frontend to Vercel and continue hosting `server/` on a separate host (Heroku, Fly, Render, a VPS, or Cloud Run). In this case, set `VITE_API_URL` in Vercel to point to your backend URL.
  2. Refactor the backend into serverless functions (`/api` endpoints) to run on Vercel — this requires code changes and migration away from SQLite (use Firestore or another serverless-friendly DB).
  3. Have the frontend write directly to Firestore (set `VITE_USE_FIREBASE=true`) and decommission server endpoints for public submissions.

If you want, I can:
- Create a GitHub Action to auto-deploy, or
- Implement serverless endpoints for core API routes, or
- Help you choose hosting for the `server/` app and prepare deployment steps.

