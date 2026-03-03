# Klinik Laktasi IKMI

Aplikasi Manajemen Klinik Laktasi - ERM (Electronic Medical Record)

## 📁 Struktur Proyek

```
klinik_laktasi/
├── backend/          # API & database
│   ├── src/
│   ├── prisma/
│   └── package.json
├── frontend/         # Dashboard aplikasi
│   ├── src/
│   └── package.json
├── package.json      # Root workspace
├── README.md
└── RAILWAY.md        # Panduan deploy ke Railway
```

## 🚀 Cara Menjalankan

### Development Mode (Lokal)

**1. Install Dependencies:**
```bash
npm run install:all
```

**2. Jalankan Backend + Frontend:**
```bash
npm run dev
```
- Backend: http://localhost:3000
- Frontend: http://localhost:5173

### Production Mode (Railway/Docker)

```bash
npm run start:prod
```

Atau lihat [RAILWAY.md](RAILWAY.md) untuk panduan deploy lengkap.

## 🔧 Setup Database

### Local Database
Edit `backend/.env`:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
```

### Supabase Cloud
Edit `backend/.env`:
```env
DATABASE_URL="postgresql://postgres.[PROJECT_REF]:[PASSWORD]@aws-1-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.[PROJECT_REF]:[PASSWORD]@aws-1-ap-southeast-1.pooler.supabase.com:5432/postgres"
```

Run migrations:
```bash
cd backend
npx prisma migrate dev
npx prisma generate
npm run seed
```

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js, Prisma ORM, PostgreSQL, JWT, bcryptjs
- **Frontend:** React 19, TypeScript, Vite, React Router DOM, Bootstrap 5, Tailwind CSS, Recharts, Axios
- **DevOps:** Docker, Railway, Supabase

## 📄 Dokumentasi

- [RAILWAY.md](RAILWAY.md) - Panduan deploy ke Railway
- [backend/.env.example](backend/.env.example) - Template environment variables

## 👥 Default Login

Setelah run seed:
- **Email:** admin@kliniklaktasi.id
- **Password:** admin
