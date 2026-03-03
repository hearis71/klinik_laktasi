const prisma = require("../prisma/client");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "klinik_laktasi_rahasia";

// Health check function
exports.healthCheck = async () => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return { status: "healthy", database: "connected" };
  } catch (err) {
    return { status: "unhealthy", database: "disconnected", error: err.message };
  }
};

exports.login = async (email, password) => {
  const user = await prisma.user.findUnique({
    where: { email }
  });

  if (!user) {
    throw new Error("Email tidak ditemukan");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Password salah");
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, nama: user.nama, role: user.role },
    JWT_SECRET,
    { expiresIn: "7d" }
  );

  return {
    id: user.id,
    nama: user.nama,
    email: user.email,
    role: user.role,
    token
  };
};