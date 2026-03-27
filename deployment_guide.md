# Vercel Deployment Guide

Yes, Liquify is designed to be hosted on **Vercel**! Since this is a monorepo, follow these steps to get your pilot live.

## 1. Quick Launch: "Marketing Mode" (Optional)
I have implemented a **"Mock Mode"** in the code. If you deploy to Vercel without a `DATABASE_URL`, the site will automatically switch to using demo data. This allows you to:
- Show the landing page, "How it works", and "Pricing" immediately.
- Let users click around the Dashboard and "issue" mock credit without any errors.

> [!TIP]
> Use this for your initial launch on `liquify.shop` while you set up your database provider.

## 2. Database Migration (For Full Pilot)
When you are ready for real data, you must use a hosted PostgreSQL database.

### Recommended Providers:
- **Vercel Postgres**: Easiest integration (Storage tab in Vercel).
- **Supabase**: Excellent for African markets with low latency.
- **Neon**: Great serverless Postgres.

### Technical Change:
Modify `packages/db/schema.prisma` to use Postgres:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

## 3. Vercel Project Setup (CRITICAL)
For a Turborepo monorepo to work, Vercel must be able to see the shared `packages/` folder.

1.  **Import Repository**: Connect your GitHub account.
2.  **Framework Preset**: Select **Next.js**.
3.  **Root Directory**: **LEAVE THIS EMPTY** (or set to `./`). 
    - *Common Error: Do not set this to `apps/web`. If you already did, reset it to the root.*
4.  **Build Command**: `npx turbo run build --filter=web`
5.  **Output Directory**: `apps/web/.next`
6.  **Install Command**: `npm install` (default)

## 3. Environment Variables
Add these in the Vercel Dashboard (**Settings > Environment Variables**):

| Key | Value | Note |
| :--- | :--- | :--- |
| `DATABASE_URL` | `postgres://...` | From your DB provider |
| `NEXT_PUBLIC_APP_URL` | `https://your-app.vercel.app` | Your deployment URL |
| `APP_SECRET` | `generate-a-random-string` | Used for session security |

## 5. Custom Domain (liquify.shop)
1.  In Vercel, go to **Settings > Domains**.
2.  Add `liquify.shop`.
3.  Vercel will provide **A Records** or **CNAME** records. Copy these to your domain registrar (e.g., Namecheap, GoDaddy).

## 6. Deployment Commands (GitHub)
Run these in your local terminal to push your changes:
```bash
git add .
git commit -m "chore: enable mock mode and prepare for vercel"
git push origin main
```

---
*Status: Ready for Production. The application is now "Safe-to-Build" both with and without a live database.*
