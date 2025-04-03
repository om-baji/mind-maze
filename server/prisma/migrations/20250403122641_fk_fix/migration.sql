/*
  Warnings:

  - You are about to drop the column `attemptId` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[attemptId]` on the table `Attempts` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Attempts` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Attempts" DROP CONSTRAINT "Attempts_attemptId_fkey";

-- AlterTable
ALTER TABLE "Attempts" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "attemptId";

-- CreateIndex
CREATE UNIQUE INDEX "Attempts_attemptId_key" ON "Attempts"("attemptId");

-- AddForeignKey
ALTER TABLE "Attempts" ADD CONSTRAINT "Attempts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
