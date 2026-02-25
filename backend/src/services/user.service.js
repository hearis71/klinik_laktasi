const prisma = require("../prisma/client");
const bcrypt = require("bcryptjs");

exports.create = async (data) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);

  return prisma.user.create({
    data: {
      nama: data.nama,
      email: data.email,
      password: hashedPassword,
      role: data.role
    }
  });
};

exports.findByEmail = (email) => {
  return prisma.user.findUnique({
    where: { email }
  });
};