# TaskFlow

[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue?logo=typescript)](https://typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-5.14-2D3748?logo=prisma)](https://prisma.io/)

A full-stack Kanban project board for managing tasks with drag-and-drop, built with Next.js 14, TypeScript, Tailwind CSS, and PostgreSQL.

## Features

- **Kanban Board** — Drag-and-drop tasks between To Do, In Progress, and Done columns
- **Task Management** — Create, edit, and delete tasks with title, description, priority, and due date
- **Search & Filter** — Real-time search across tasks and filter by priority level
- **Dark Mode** — System-aware theme toggle with persistent preference
- **Responsive** — Works on desktop, tablet, and mobile
- **REST API** — Full CRUD endpoints for tasks and columns
- **Type-Safe** — End-to-end TypeScript with Prisma-generated types

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Database | PostgreSQL |
| ORM | Prisma |
| Drag & Drop | dnd-kit |
| Icons | Lucide React |
| Testing | Vitest + Testing Library |

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL (or use a cloud provider like Neon)

### Installation

```bash
git clone https://github.com/mshayan1620/taskflow.git
cd taskflow
npm install
```

### Environment Setup

```bash
cp .env.example .env
```

Edit `.env` with your PostgreSQL connection string.

### Database Setup

```bash
npx prisma generate
npx prisma db push
npm run db:seed
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Testing

```bash
npm test
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/columns` | Fetch all columns with tasks |
| `POST` | `/api/tasks` | Create a new task |
| `PATCH` | `/api/tasks/:id` | Update a task |
| `DELETE` | `/api/tasks/:id` | Delete a task |

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── columns/route.ts
│   │   └── tasks/
│   │       ├── route.ts
│   │       └── [id]/route.ts
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── Board.tsx
│   ├── Column.tsx
│   ├── Header.tsx
│   ├── SearchFilter.tsx
│   ├── TaskCard.tsx
│   ├── TaskModal.tsx
│   └── ThemeProvider.tsx
├── lib/
│   ├── db.ts
│   └── mock-data.ts
└── types/
    └── index.ts
```

## Screenshots

*Coming soon*

## License

MIT
