# Klinik Laktasi IKMI - Project Context

## Project Overview

**Klinik Laktasi IKMI** is an Electronic Medical Record (ERM) system for a lactation clinic. It is a full-stack web application built as a monorepo with separate backend and frontend packages.

### Architecture

```
klinik_laktasi/
├── backend/          # Express.js API server with Prisma ORM
│   ├── src/
│   │   ├── config/       # Configuration files
│   │   ├── controllers/  # Request handlers (auth, pasien, kunjungan, registrasi, user)
│   │   ├── middlewares/  # Auth & error handling middleware
│   │   ├── routes/       # API route definitions
│   │   ├── services/     # Business logic layer
│   │   ├── utils/        # Utility functions
│   │   ├── app.js        # Express app setup
│   │   └── server.js     # Server entry point
│   ├── prisma/
│   │   ├── migrations/   # Database migrations
│   │   ├── schema.prisma # Prisma schema (User, Pasien, Kunjungan, Registrasi)
│   │   └── seed.js       # Database seeding
│   └── package.json
├── frontend/         # React + Vite + TypeScript dashboard
│   ├── src/
│   │   ├── components/   # Reusable UI (Header, Sidebar, StatCard)
│   │   ├── context/      # React context (AuthContext)
│   │   ├── layouts/      # Page layouts (DashboardLayout)
│   │   ├── pages/        # Application pages (16 pages)
│   │   ├── services/     # API service layer
│   │   ├── App.jsx       # Main app with React Router
│   │   ├── main.jsx      # Entry point
│   │   └── style.css     # Global styles
│   ├── public/           # Static assets
│   ├── index.html
│   └── vite.config.js
├── Dockerfile        # Production Docker configuration
├── package.json      # Workspace root with concurrently scripts
└── README.md
```

## Tech Stack

| Layer       | Technologies                                    |
|-------------|-------------------------------------------------|
| **Backend** | Node.js, Express.js, Prisma ORM, PostgreSQL, JWT, bcryptjs |
| **Frontend**| React 19, TypeScript, Vite, React Router DOM, Bootstrap 5, Tailwind CSS, Recharts, Axios |
| **DevOps**  | Docker, concurrently (for parallel dev servers) |

## Database Schema (Prisma)

- **User** - Authentication & authorization (role-based)
- **Pasien** - Patient records (NIK, medical record number, demographics)
- **Kunjungan** - Visit records (complaints, red flags, status)
- **Registrasi** - Registration/assessment records (mother & baby info)

## Building and Running

### Prerequisites

- Node.js 20+
- PostgreSQL database
- Environment variables configured in `backend/.env` (especially `DATABASE_URL`)

### Development Mode

**Run both backend and frontend concurrently:**
```bash
npm install              # Install workspace dependencies (including concurrently)
npm run install:all      # Install backend & frontend dependencies
npm run dev              # Start both servers (backend:3000, frontend:5173)
```

**Run individually:**
```bash
# Backend only
cd backend
npm install
npx prisma generate
npx prisma migrate dev   # Run migrations (if needed)
npm run dev              # Server at http://localhost:3000

# Frontend only
cd frontend
npm install
npm run dev              # Dashboard at http://localhost:5173
```

### Production Build

```bash
# Build frontend for production
cd frontend
npm run build            # Output to frontend/dist

# Run backend in production mode
cd backend
npm start                # Serves API + static frontend files
```

### Docker

```bash
docker build -t klinik-laktasi .
docker run -p 3000:3000 --env-file .env klinik-laktasi
```

## API Endpoints

| Method | Endpoint           | Description              |
|--------|--------------------|--------------------------|
| POST   | `/api/auth/login`  | User authentication      |
| GET    | `/api/user`        | Get users                |
| GET    | `/api/pasien`      | Get patients             |
| POST   | `/api/pasien`      | Create patient           |
| GET    | `/api/kunjungan`   | Get visits               |
| POST   | `/api/kunjungan`   | Create visit             |
| GET    | `/api/registrasi`  | Get registrations        |
| POST   | `/api/registrasi`  | Create registration      |

## Frontend Pages

| Page            | Route              | Description                    |
|-----------------|--------------------|--------------------------------|
| Login           | `/login`           | Authentication page            |
| Dashboard       | `/`                | Main dashboard with stats      |
| Pasien          | `/pasien`          | Patient management             |
| Pasien Baru     | *(component)*      | New patient registration       |
| Tarif           | `/tarif`           | Service pricing management     |
| Obat            | `/obat`            | Medicine/pharmacy management   |
| Registrasi      | `/registrasi`      | Patient registration           |
| Antrian         | `/antrian`         | Queue management               |
| Rekam Medis     | `/rekam-medis`     | Medical records                |
| Farmasi         | `/farmasi`         | Pharmacy module                |
| Pembayaran      | `/pembayaran`      | Payment processing             |
| Kunjungan       | `/kunjungan`       | Visit history                  |
| Asesmen         | `/asesmen`         | Assessment form                |
| Manajemen User  | `/manajemen-user`  | User administration            |
| Setting         | `/setting`         | Application settings           |

## Development Conventions

### Code Style
- **Backend:** CommonJS modules (`require`/`module.exports`)
- **Frontend:** ES modules (`import`/`export`) with TypeScript
- **Styling:** Tailwind CSS with Bootstrap components

### Authentication Flow
- JWT-based authentication
- Token stored in `localStorage`
- Protected routes use `AuthContext` for session management
- Backend middleware validates JWT tokens

### Database Operations
- All database access through Prisma ORM
- Migrations stored in `backend/prisma/migrations/`
- Use `npx prisma migrate dev` for schema changes during development

### Project Structure Patterns
- Controllers handle HTTP request/response logic
- Services contain business logic (when applicable)
- Routes map endpoints to controller functions
- Frontend pages are organized by feature/module

## Environment Variables

**Backend (`backend/.env`):**
```
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
JWT_SECRET=your-secret-key
PORT=3000
```

## Key Files Reference

| File                          | Purpose                              |
|-------------------------------|--------------------------------------|
| `backend/prisma/schema.prisma`| Database schema definition           |
| `backend/src/app.js`          | Express app configuration            |
| `backend/src/middlewares/auth.middleware.js` | JWT validation |
| `frontend/src/App.jsx`        | React Router configuration           |
| `frontend/src/context/AuthContext.jsx` | Authentication state management |
| `frontend/src/layouts/DashboardLayout.jsx` | Main dashboard layout |
| `Dockerfile`                  | Production containerization          |
