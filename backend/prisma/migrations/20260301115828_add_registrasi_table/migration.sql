-- CreateTable
CREATE TABLE "Registrasi" (
    "id" TEXT NOT NULL,
    "no_registrasi" TEXT NOT NULL,
    "tanggalPengkajian" DATE NOT NULL,
    "waktuPengkajian" TEXT NOT NULL,
    "pasienId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "namaIbu" TEXT NOT NULL,
    "tanggalLahirIbu" DATE NOT NULL,
    "usiaIbu" TEXT NOT NULL,
    "namaBayi" TEXT,
    "tanggalLahirBayi" DATE,
    "usiaBayi" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Registrasi_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Registrasi_no_registrasi_key" ON "Registrasi"("no_registrasi");

-- CreateIndex
CREATE INDEX "Registrasi_pasienId_idx" ON "Registrasi"("pasienId");

-- CreateIndex
CREATE INDEX "Registrasi_userId_idx" ON "Registrasi"("userId");

-- CreateIndex
CREATE INDEX "Registrasi_no_registrasi_idx" ON "Registrasi"("no_registrasi");

-- AddForeignKey
ALTER TABLE "Registrasi" ADD CONSTRAINT "Registrasi_pasienId_fkey" FOREIGN KEY ("pasienId") REFERENCES "Pasien"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Registrasi" ADD CONSTRAINT "Registrasi_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
