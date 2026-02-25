const prisma = require("../prisma/client");
const bcrypt = require("bcryptjs");

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

  return {
    id: user.id,
    nama: user.nama,
    email: user.email,
    role: user.role
  };
};