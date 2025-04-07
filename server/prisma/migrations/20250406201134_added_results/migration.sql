-- CreateTable
CREATE TABLE "Results" (
    "id" TEXT NOT NULL,
    "result" INTEGER NOT NULL,
    "attemptId" TEXT NOT NULL,

    CONSTRAINT "Results_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Results" ADD CONSTRAINT "Results_attemptId_fkey" FOREIGN KEY ("attemptId") REFERENCES "Attempts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
