FROM node:20-alpine AS base

WORKDIR /app

# Salin file konfigurasi package
COPY package*.json ./
COPY backend/package*.json backend/
COPY frontend/package*.json frontend/

# Install dependency backend dan frontend
RUN npm install --prefix backend && npm install --prefix frontend

# Salin source code
COPY backend ./backend
COPY frontend ./frontend

# Build frontend (Vite) menjadi file statis
RUN npm run build --prefix frontend

# Set environment dan port
ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

# Jalankan backend (Express) yang juga akan melayani file statis hasil build frontend
CMD ["npm", "start", "--prefix", "backend"]

