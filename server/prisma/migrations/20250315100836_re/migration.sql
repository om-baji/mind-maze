/*
  Warnings:

  - You are about to drop the column `refershToken` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "refershToken",
ADD COLUMN     "refreshToken" TEXT;
