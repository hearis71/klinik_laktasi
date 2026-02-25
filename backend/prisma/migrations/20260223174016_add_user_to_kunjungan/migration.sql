/*
  Warnings:

  - Added the required column `userId` to the `Kunjungan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Kunjungan" ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Kunjungan_userId_idx" ON "Kunjungan"("userId");

-- AddForeignKey
ALTER TABLE "Kunjungan" ADD CONSTRAINT "Kunjungan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
