# Portfolio + Admin Panel

This project includes:

- a public Next.js website
- a TypeScript Express backend under `backend/`
- an admin panel at `/admin`
- MongoDB-backed admin storage
- contact form management, content editing, SEO editing, backups, and activity logging

## Stack

- Frontend: Next.js + React + TypeScript
- Backend: Node.js + Express + TypeScript
- Storage: MongoDB
- Auth: bcrypt + JWT
- Email: Resend (optional, for notifications + auto-reply)

## Local Setup

### Frontend env

Create `my-app/.env.local`:

```env
NEXT_PUBLIC_ADMIN_API_URL=http://localhost:4000
```

### Backend env

Create `my-app/backend/.env`:

```env
NODE_ENV=development
PORT=4000
MONGODB_URI=mongodb://127.0.0.1:27017/portfolio-admin
JWT_SECRET=replace_with_a_long_random_secret
JWT_EXPIRES_IN=7d
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=ChangeMe123!
CORS_ORIGIN=http://localhost:3000
RESEND_API_KEY=
RESEND_FROM_EMAIL=onboarding@resend.dev
CONTACT_NOTIFICATION_EMAIL=hristoforovbruno@gmail.com
```

### Install

```bash
npm install
cd backend
npm install
```

### Run locally

```bash
npm run dev:all
```

Frontend:
- `http://localhost:3000`

Admin:
- `http://localhost:3000/admin`

Backend health:
- `http://localhost:4000/health`

## Sample Admin Login

- Email: `admin@example.com`
- Password: `ChangeMe123!`

## Vercel Backend Deployment

The backend can now be deployed to Vercel as a serverless Express function.

Important:
- persistent local disk is not available on Vercel
- this backend must use `MONGODB_URI` in production
- the backend health endpoint on Vercel is `/api/health`

### Deploy `backend/` as its own Vercel project

1. Set the project root to `my-app/backend`
2. Add these environment variables in Vercel:
   - `NODE_ENV=production`
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `JWT_EXPIRES_IN=7d`
   - `ADMIN_EMAIL`
   - `ADMIN_PASSWORD`
   - `CORS_ORIGIN=https://your-frontend-domain.vercel.app`
   - `RESEND_API_KEY` if you use email sending
   - `RESEND_FROM_EMAIL`
   - `CONTACT_NOTIFICATION_EMAIL`
3. Deploy

Your backend routes will stay under `/api/*`, for example:
- `/api/health`
- `/api/auth/login`
- `/api/contact`

## Vercel Frontend Deployment

Deploy `my-app/` as a separate Vercel project for the Next.js frontend.

1. Set the project root to `my-app`
2. Add this environment variable:
   - `NEXT_PUBLIC_ADMIN_API_URL=https://your-backend-project.vercel.app`
3. Deploy

### Frontend env for Vercel

Set `NEXT_PUBLIC_ADMIN_API_URL` in the frontend project to your backend Vercel URL, for example:

```env
NEXT_PUBLIC_ADMIN_API_URL=https://your-backend-project.vercel.app
```

### Recommended Vercel setup

- Create one Vercel project for `my-app`
- Create one Vercel project for `my-app/backend`
- Set backend `CORS_ORIGIN` to the frontend Vercel domain
- Set frontend `NEXT_PUBLIC_ADMIN_API_URL` to the backend Vercel domain
- If you use preview deployments, add the matching preview domains as allowed CORS origins too

## VPS Deployment

Recommended stack:

- Ubuntu 24.04
- Node.js 20+
- PM2
- Nginx
- optional Certbot for HTTPS

### 1. Copy project to server

Place the app on the server, for example:

```bash
/var/www/portfolio-app
```

### 2. Install dependencies

From `my-app/`:

```bash
npm install
cd backend
npm install
cd ..
```

### 3. Production env files

Use:

- [frontend.env.production.example](c:\Users\hrist\OneDrive\Desktop\main-portfolio-project\my-app\deploy\frontend.env.production.example)
- [backend.env.production.example](c:\Users\hrist\OneDrive\Desktop\main-portfolio-project\my-app\deploy\backend.env.production.example)

Set production values, especially:

- `NEXT_PUBLIC_ADMIN_API_URL=https://yourdomain.com`
- `JWT_SECRET`
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`
- `CORS_ORIGIN=https://yourdomain.com`
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `CONTACT_NOTIFICATION_EMAIL=hristoforovbruno@gmail.com`

### 4. Build

```bash
npm run build:all
```

### 5. Start with PM2

Use [ecosystem.config.cjs](c:\Users\hrist\OneDrive\Desktop\main-portfolio-project\my-app\ecosystem.config.cjs):

```bash
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup
```

This runs:

- frontend on `127.0.0.1:3000`
- backend on `127.0.0.1:4000`

### 6. Configure Nginx

Use [nginx.conf.example](c:\Users\hrist\OneDrive\Desktop\main-portfolio-project\my-app\deploy\nginx.conf.example) as the base.

Behavior:

- `/` -> Next.js frontend on port `3000`
- `/api/` -> Express backend on port `4000`

### 7. Enable HTTPS

After DNS points to the server:

```bash
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

## Notes

- Admin and CMS data are stored in MongoDB.
- Keep regular backups from `/admin/backups`.
- If you change the admin password in the panel, the env default may no longer match.
- Resend emails only work when `RESEND_API_KEY` is set.
