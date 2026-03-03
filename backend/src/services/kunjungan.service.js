const prisma = require("../prisma/client");

exports.create = async (data) => {
  return prisma.kunjungan.create({
    data: {
      pasienId: data.pasienId,
      userId: data.userId,
      tanggalKunjungan: new Date(data.tanggalKunjungan),
      keluhanUtama: data.keluhanUtama,
      redFlags: data.redFlags ?? false
    }
  });
};

exports.findAll = async () => {
  return prisma.kunjungan.findMany({
    include: {
      pasien: true,
      user: true
    },
    orderBy: { createdAt: 'desc' }
  });
};

exports.findOne = async (id) => {
  return prisma.kunjungan.findUnique({
    where: { id },
    include: {
      pasien: true,
      user: true
    }
  });
};

exports.update = async (id, data) => {
  return prisma.kunjungan.update({
    where: { id },
    data: {
      pasienId: data.pasienId,
      userId: data.userId,
      tanggalKunjungan: data.tanggalKunjungan ? new Date(data.tanggalKunjungan) : undefined,
      keluhanUtama: data.keluhanUtama,
      redFlags: data.redFlags
    }
  });
};

exports.remove = async (id) => {
  return prisma.kunjungan.delete({
    where: { id }
  });
};