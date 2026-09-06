# Nutrexia D2C E-Commerce

Climate-Smart Plant Protein D2C E-Commerce Web Application built for **Nutrexia** by **CM-eServices**.

## Tech Stack

- **Framework**: Next.js 15 (App Router) with React 19
- **Language**: TypeScript 5
- **Database**: PostgreSQL via Prisma ORM (Supabase hosted)
- **Styling**: Vanilla CSS with custom design tokens
- **Deployment**: Hostinger Managed Node.js (standalone output)

## Getting Started

```bash
# Install dependencies
npm install

# Generate Prisma client
npm run db:generate

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production Build

```bash
npm run build
node server.js
```

## Project Structure

```
├── src/
│   ├── app/          # Next.js App Router pages & layouts
│   └── types/        # Domain types & interfaces
├── prisma/
│   └── schema.prisma # Database schema
├── server.js         # Hostinger standalone launcher
├── next.config.mjs   # Next.js configuration
└── package.json
```

## Environment Variables

Copy `.env.example` to `.env` and fill in your credentials.

## Deployment

This project auto-deploys to Hostinger on push to `master`:
- **Storefront**: [https://nutrexia.in](https://nutrexia.in)
