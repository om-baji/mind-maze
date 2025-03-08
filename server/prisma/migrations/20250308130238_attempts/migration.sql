-- AlterTable
ALTER TABLE "User" ADD COLUMN     "attempts" JSONB;

-- CreateTable
CREATE TABLE "Attempts" (
    "id" TEXT NOT NULL,
    "attemptId" TEXT NOT NULL,
    "map" JSONB NOT NULL,

    CONSTRAINT "Attempts_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Attempts" ADD CONSTRAINT "Attempts_attemptId_fkey" FOREIGN KEY ("attemptId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
