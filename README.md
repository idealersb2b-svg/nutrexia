# Nutrexia D2C E-Commerce Monorepo

Climate-Smart Plant Protein D2C E-Commerce Web Application built for **Nutrexia** by **CM-eServices**.

## Architecture & Monorepo Structure

- **`apps/web`**: Next.js 15 Storefront + Progressive Web App (PWA)
- **`apps/api`**: NestJS Node.js Backend API (Commerce Engine, Auth, Razorpay, Shiprocket)
- **`apps/admin`**: Next.js Admin Panel (Catalogue, Inventory, Orders, CMS)
- **`packages/ui`**: Shared Design System (Nutrexia theme components, typography, layout)
- **`packages/types`**: Shared TypeScript Interfaces & Data Models
- **`packages/validation`**: Shared Zod Validation Schemas
- **`packages/utils`**: Shared Helpers & Currency Formatters
- **`prisma/`**: PostgreSQL Database Schema & Migrations

## Prerequisites

- Node.js `v18.0.0` or higher (Tested on Node `v24.15.0`)
- PNPM `v8.0.0` or higher (Tested on PNPM `v11.13.0`)
- PostgreSQL database instance

## Local Development Setup

1. **Clone & Install Dependencies**:
   ```bash
   git clone https://github.com/idealersb2b-svg/nutrexia.git
   cd nutrexia
   pnpm install
   ```

2. **Environment Variables**:
   Copy `.env.example` to `.env` in the root and configure database credentials:
   ```bash
   cp .env.example .env
   ```

3. **Database Migration & Prisma Client**:
   ```bash
   pnpm db:generate
   pnpm db:migrate
   ```

4. **Run All Apps in Development Mode**:
   ```bash
   pnpm dev
   ```
   - Storefront: `http://localhost:3000`
   - Admin Panel: `http://localhost:3001`
   - Backend API: `http://localhost:4000`

## Production Deployment (Hostinger)

The repository is built for deployment on Hostinger Node.js / VPS hosting environment.

---
© 2026 Carbin Naturals Pvt Ltd / IDEALERS B2B PVT LTD. All rights reserved.
