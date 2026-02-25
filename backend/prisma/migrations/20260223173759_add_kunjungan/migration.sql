/*
  Warnings:

  - You are about to drop the column `catatan` on the `Kunjungan` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Kunjungan` table. All the data in the column will be lost.
  - You are about to drop the column `tanggal` on the `Kunjungan` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Kunjungan` table. All the data in the column will be lost.
  - Added the required column `keluhanUtama` to the `Kunjungan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tanggalKunjungan` to the `Kunjungan` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Kunjungan" DROP CONSTRAINT "Kunjungan_userId_fkey";

-- AlterTable
ALTER TABLE "Kunjungan" DROP COLUMN "catatan",
DROP COLUMN "status",
DROP COLUMN "tanggal",
DROP COLUMN "userId",
ADD COLUMN     "keluhanUtama" TEXT NOT NULL,
ADD COLUMN     "redFlags" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "statusKunjungan" TEXT NOT NULL DEFAULT 'OPEN',
ADD COLUMN     "tanggalKunjungan" DATE NOT NULL;

-- CreateIndex
CREATE INDEX "Kunjungan_pasienId_idx" ON "Kunjungan"("pasienId");
