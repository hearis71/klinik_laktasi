/*
  Warnings:

  - A unique constraint covering the columns `[no_rm]` on the table `Pasien` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `no_rm` to the `Pasien` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pasien" ADD COLUMN     "no_rm" TEXT NOT NULL,
ALTER COLUMN "tanggalLahir" SET DATA TYPE DATE;

-- CreateIndex
CREATE UNIQUE INDEX "Pasien_no_rm_key" ON "Pasien"("no_rm");
