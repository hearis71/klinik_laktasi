# Klinik Laktasi IKMI
hearis
Aplikasi Manajemen Klinik Laktasi - ERM (Electronic Medical Record)

## Struktur Proyek

```
klinik_laktasi/
├── backend/          # API & database
│   ├── src/
│   ├── prisma/
│   └── package.json
├── frontend/         # Dashboard aplikasi
│   └── klinik-laktasi-dashboard/
└── README.md
```

## Cara Menjalankan

### Backend

```bash
cd backend
npm install
# Pastikan DATABASE_URL di .env sudah dikonfigurasi
npx prisma generate
npx prisma migrate dev   # jika perlu migrasi
npm run dev
```

Backend berjalan di `http://localhost:3000`

### Frontend

```bash
cd frontend/klinik-laktasi-dashboard
npm install
npm run dev
```

## Tech Stack

- **Backend:** Node.js, Express, Prisma, PostgreSQL, JWT
- **Frontend:** Vite, TypeScript
