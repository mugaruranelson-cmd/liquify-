# Liquify — Smart Credit for Informal Retail

Liquify is a behavior-based credit scoring and management platform designed specifically for informal retail shop owners in Kenya. It allows merchants to issue credit, track repayments, and build digital financial profiles for their customers.

## 🚀 Local Quickstart (Pilot Phase)

You can run Liquify on any computer with **Node.js** installed.

### 1. Install Dependencies
From the project root, run:
```bash
npm install
```

### 2. Initialize the Local Database
Liquify uses a local **SQLite** database for the pilot, so you don't need to set up a separate server.
```bash
# Generate the database client
npx prisma generate

# Create/Sync the local database file (dev.db)
npx prisma db push
```

### 3. Start the Development Server
```bash
npm run dev
```

### 4. Access the Platform
- **Web Portal**: [http://localhost:3000](http://localhost:3000)
- **Admin Portal**: [http://localhost:3001](http://localhost:3001)

---

## 🔑 Pilot Access
Usage credentials for the test merchant:
- **Email**: `admin@liquify.shop`
- **Password**: `pilot2026`

## 🏗️ Architecture
This is a [Turborepo](https://turbo.build/repo) monorepo:
- `apps/web`: The main merchant and customer portal.
- `apps/admin`: The platform administration interface.
- `packages/db`: Prisma schema and shared database logic.
- `packages/ui`: Shared design system and React components.

## ☁️ Deployment
For production hosting on Vercel, refer to the [Deployment Guide](./brain/1da92d3f-df5c-4196-a592-0b0680a127dd/deployment_guide.md).

---
*Developed for the Liquify Manual-First Pilot Phase.*
