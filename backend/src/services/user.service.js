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

exports.findAll = async () => {
  return prisma.user.findMany({
    select: {
      id: true,
      nama: true,
      email: true,
      role: true,
      createdAt: true
    },
    orderBy: { createdAt: 'desc' }
  });
};

exports.delete = async (id) => {
  return prisma.user.delete({
    where: { id }
  });
};

exports.findByEmail = (email) => {
  return prisma.user.findUnique({
    where: { email }
  });
};