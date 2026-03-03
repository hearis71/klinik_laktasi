const prisma = require("../prisma/client");

const generateNoRegistrasi = async (tanggalPengkajian) => {
  const date = new Date(tanggalPengkajian);
  const year = String(date.getFullYear()).slice(-2);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const datePrefix = `${year}${month}${day}`;

  const today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const last = await prisma.registrasi.findFirst({
    where: {
      createdAt: {
        gte: today,
        lt: tomorrow
      }
    },
    orderBy: { no_registrasi: "desc" },
    select: { no_registrasi: true }
  });

  let nextNumber = 1;
  if (last) {
    const match = last.no_registrasi.match(/R-\d{6}(\d{3})$/);
    if (match && match[1]) {
      nextNumber = parseInt(match[1], 10) + 1;
    }
  }

  const sequence = String(nextNumber).padStart(3, "0");
  return `R-${datePrefix}${sequence}`;
};

exports.create = async (data, userId) => {
  const no_registrasi = await generateNoRegistrasi(data.tanggalPengkajian);

  return prisma.registrasi.create({
    data: {
      no_registrasi,
      tanggalPengkajian: new Date(data.tanggalPengkajian),
      waktuPengkajian: data.waktuPengkajian,
      pasienId: data.pasienId,
      userId,
      namaIbu: data.namaIbu,
      tanggalLahirIbu: new Date(data.tanggalLahirIbu),
      usiaIbu: data.usiaIbu,
      namaBayi: data.namaBayi || null,
      tanggalLahirBayi: data.tanggalLahirBayi ? new Date(data.tanggalLahirBayi) : null,
      usiaBayi: data.usiaBayi || null
    }
  });
};

exports.findAll = () => {
  return prisma.registrasi.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      pasien: true,
      user: true
    }
  });
};

exports.findById = (id) => {
  return prisma.registrasi.findUnique({
    where: { id },
    include: {
      pasien: true,
      user: true
    }
  });
};

exports.findByNoRegistrasi = (no_registrasi) => {
  return prisma.registrasi.findUnique({
    where: { no_registrasi },
    include: {
      pasien: true,
      user: true
    }
  });
};

exports.findByPasienId = (pasienId) => {
  return prisma.registrasi.findMany({
    where: { pasienId },
    orderBy: { createdAt: "desc" },
    include: {
      pasien: true,
      user: true
    }
  });
};

exports.update = (id, data) => {
  const updateData = { ...data };
  if (updateData.tanggalPengkajian) {
    updateData.tanggalPengkajian = new Date(updateData.tanggalPengkajian);
  }
  if (updateData.tanggalLahirIbu) {
    updateData.tanggalLahirIbu = new Date(updateData.tanggalLahirIbu);
  }
  if (updateData.tanggalLahirBayi) {
    updateData.tanggalLahirBayi = new Date(updateData.tanggalLahirBayi);
  }

  return prisma.registrasi.update({
    where: { id },
    data: updateData,
    include: {
      pasien: true,
      user: true
    }
  });
};

exports.remove = (id) => {
  return prisma.registrasi.delete({
    where: { id }
  });
};
