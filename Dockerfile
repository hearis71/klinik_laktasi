FROM node:20-alpine

WORKDIR /app

# Copy root package files
COPY package*.json ./

# Copy backend and frontend
COPY backend ./backend
COPY frontend ./frontend

# Install all dependencies
RUN npm install --prefix backend && npm install --prefix frontend

# Build frontend
RUN npm run build --prefix frontend

# Copy frontend dist to backend for serving
RUN cp -r frontend/dist backend/dist

# Set environment
ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

# Start backend
CMD ["npm", "start", "--prefix", "backend"]

