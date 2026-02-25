FROM node:20

WORKDIR /app

# Salin file konfigurasi package dan source code
COPY package*.json ./
COPY backend ./backend
COPY frontend ./frontend

# Install dependency backend dan frontend
RUN npm install --prefix backend && npm install --prefix frontend

# Build frontend (Vite) menjadi file statis
RUN npm run build --prefix frontend

# Set environment dan port
ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

# Jalankan backend (Express) yang juga akan melayani file statis hasil build frontend
CMD ["npm", "start", "--prefix", "backend"]

