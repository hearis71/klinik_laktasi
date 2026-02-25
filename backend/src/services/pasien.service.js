const prisma = require("../prisma/client");

const generateNoRM = async () => {
  const last = await prisma.pasien.findFirst({
    orderBy: { no_rm: "desc" },
    select: { no_rm: true }
  });

  const nextNumber = last
    ? parseInt(last.no_rm, 10) + 1
    : 1;

  return String(nextNumber).padStart(6, "0");
};

exports.create = async (data) => {
  const no_rm = await generateNoRM();

  return prisma.pasien.create({
    data: {
      no_rm,
      nik: data.nik,
      nama: data.nama,
      tanggalLahir: new Date(data.tanggalLahir),
      alamat: data.alamat,
      noHp: data.noHp
    }
  });
};

exports.findAll = () => {
  return prisma.pasien.findMany({ orderBy: { createdAt: "desc" } });
};

exports.findById = (id) => {
  return prisma.pasien.findUnique({ where: { id } });
};

exports.update = (id, data) => {
  return prisma.pasien.update({
    where: { id },
    data,
  });
};

exports.remove = (id) => {
  return prisma.pasien.delete({
    where: { id }
  });
};

