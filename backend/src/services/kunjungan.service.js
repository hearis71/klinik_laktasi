const prisma = require("../prisma/client");

exports.create = (data) => {
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