# Remedy — Company Website

Marketing and landing site for **Remedy Health Technologies**, built with [Next.js](https://nextjs.org), TypeScript, and Tailwind CSS.

---

## Prerequisites

Make sure you have the following installed before getting started:

| Tool | Minimum version | Check |
|------|----------------|-------|
| [Node.js](https://nodejs.org) | 18.x or higher | `node --version` |
| npm | 9.x or higher | `npm --version` |
| Git | any recent version | `git --version` |

> **Tip:** Use [nvm](https://github.com/nvm-sh/nvm) (macOS/Linux) or [nvm-windows](https://github.com/coreybutler/nvm-windows) to manage Node versions easily.

---

## Local Setup

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd Remedy-Site
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The page hot-reloads as you edit files.

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start local dev server with hot-reload |
| `npm run build` | Create an optimised production build |
| `npm run start` | Serve the production build locally |
| `npm run lint` | Run ESLint across the project |

---

## Project Structure

```
app/
├── components/
│   ├── Navbar.tsx       # Sticky navigation bar
│   ├── Hero.tsx         # Full-screen hero section
│   ├── Mission.tsx      # Company mission & values
│   ├── Product.tsx      # Product features & device mockup
│   ├── Technology.tsx   # AI & tech stack overview
│   ├── Team.tsx         # Founders section
│   ├── Contact.tsx      # Contact form
│   └── Footer.tsx       # Site footer
├── globals.css          # Global styles & Tailwind imports
├── layout.tsx           # Root layout & metadata
└── page.tsx             # Main page composition
public/                  # Static assets
```

---

## Tech Stack

- **[Next.js 16](https://nextjs.org)** — React framework (App Router)
- **[TypeScript](https://www.typescriptlang.org)** — Type safety
- **[Tailwind CSS v4](https://tailwindcss.com)** — Utility-first styling
- **[Lucide React](https://lucide.dev)** — Icon library

---

## Making Changes

- **Content / copy** — edit the relevant component in `app/components/`
- **Colors / branding** — the primary brand color is `emerald-600`; search for it in components to update globally
- **Metadata** (page title, description, SEO) — edit `app/layout.tsx`
- **Adding a new section** — create a component in `app/components/`, then import and add it to `app/page.tsx`

---

## Founders

- Alexander Hayhoe
- Steven Mu
- Grady Booth
- Emres Cenk
