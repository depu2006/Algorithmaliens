# 🚀 Algorithm Aliens Deployment Guide

This guide covers step-by-step deployment instructions for the **Algorithm Aliens** full-stack repository ([github.com/depu2006/Algorithmaliens](https://github.com/depu2006/Algorithmaliens)).

---

## 🏗️ Architecture Overview

- **Frontend**: React + Vite (Static Single Page App) ➔ **Vercel / Netlify / Render Static**
- **Backend**: Node.js + Express + SQLite / Firestore ➔ **Render / Railway / VPS**

---

## ⚡ Step 1: Deploy the Backend (Express API)

Since the backend is located in the `/server` directory and runs Express with an initialized SQLite database and Firebase sync, deploy it to **Render** or **Railway**.

### Option A: Render (Free Web Service)

1. Sign in to [Render](https://render.com).
2. Click **New +** ➔ **Web Service**.
3. Connect your GitHub repository `depu2006/Algorithmaliens`.
4. Configure the settings:
   - **Name**: `algorithm-aliens-backend`
   - **Root Directory**: `server`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Add **Environment Variables**:
   - `JWT_SECRET`: `your_random_secret_key_here`
   - `ADMIN_DEFAULT_USERNAME`: `info@algorithmaliens.com`
   - `ADMIN_DEFAULT_PASSWORD`: `your_admin_password`
   - `FIREBASE_PROJECT_ID`: `algorithmaliens-90990`
6. Click **Create Web Service**.
7. Once deployed, copy your Live URL (e.g., `https://algorithm-aliens-backend.onrender.com`).

---

## 🌐 Step 2: Deploy the Frontend (React + Vite on Vercel)

1. Sign in to [Vercel](https://vercel.com).
2. Click **Add New...** ➔ **Project**.
3. Import `depu2006/Algorithmaliens`.
4. Configure Project Settings:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Add **Environment Variables**:
   - `VITE_API_URL`: `https://algorithm-aliens-backend.onrender.com/api` *(Includes `/api` suffix for backend routes)*
6. Click **Deploy**.

---

## 🔄 Step 3: Verify Integration & SPA Routing

1. Open your Vercel URL (e.g., `https://algorithmaliens.vercel.app`).
2. Verify pages load correctly and contact/booking forms send data to the backend.
3. Test navigating directly to `/admin` or `/services` to confirm `vercel.json` SPA rewrite rules work.
4. Log into the Admin panel using the username and password set in your backend environment variables.

---

## 📝 Pre-configured Project Files

The following configuration files have been prepared and optimized in the repository:
- `vercel.json`: Handles SPA client-side route rewrites for Vercel.
- `render.yaml`: Provides Blueprint setup for Render backend deployment.
