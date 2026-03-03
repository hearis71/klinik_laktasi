# Railway Deployment Guide

## Development vs Production Commands

### **Local Development:**
```bash
# Install dependencies
npm run install:all

# Run both backend + frontend (development mode)
npm run dev
```
- Backend: http://localhost:3000
- Frontend: http://localhost:5173

### **Production (Railway):**
```bash
# Build & Start
npm run start:prod
```
Or Railway will auto-run: `npm install && npm run build && npm start`

---

## Setup di Railway

### 1. Buat Project Baru di Railway
1. Login ke [railway.app](https://railway.app)
2. Click "New Project"
3. Pilih "Deploy from GitHub repo"
4. Connect repository GitHub Anda

---

### 2. Setup Single Service (Backend + Frontend)

**Service Configuration:**
- **Root Directory:** (kosongkan - gunakan root)
- **Build Command:** `npm install && npm run build`
- **Start Command:** `npm start`

**Environment Variables:**
```
DATABASE_URL=postgresql://postgres.rjruzsqtmdlxgftpnquy:klinik%20laktasi@aws-1-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true
DIRECT_URL=postgresql://postgres.rjruzsqtmdlxgftpnquy:klinik%20laktasi@aws-1-ap-southeast-1.pooler.supabase.com:5432/postgres
JWT_SECRET=klinik_laktasi_rahasia
PORT=3000
NODE_ENV=production
```

**Setelah Deploy:**
- Railway akan generate URL: `https://kliniklaktasi-production.up.railway.app`
- Frontend sudah ter-build dan di-serve oleh backend
- API endpoint: `https://kliniklaktasi-production.up.railway.app/api`

---

### 3. Test
1. Buka `https://kliniklaktasi-production.up.railway.app`
2. Login dengan:
   - Email: `admin@kliniklaktasi.id`
   - Password: `admin`
3. Test form submission

---

## Troubleshooting

### "Failed to Fetch"
- ✅ Pastikan `VITE_API_URL` di frontend sesuai dengan URL backend
- ✅ Cek CORS di backend (sudah enabled di `app.js`)
- ✅ Pastikan backend service running di Railway

### Database Connection Error
- ✅ Cek `DATABASE_URL` dan `DIRECT_URL` di Railway variables
- ✅ Pastikan Supabase project aktif
- ✅ Run `npx prisma migrate deploy` jika perlu

### Build Failed
- ✅ Pastikan `npm run build` jalan lokal
- ✅ Cek error log di Railway dashboard

---

## Update Deployments

Railway auto-deploy saat push ke GitHub:
```bash
git add .
git commit -m "your changes"
git push origin main
```

Railway akan otomatis build & deploy.
