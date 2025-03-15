-- CreateTable
CREATE TABLE "Blacklist" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Blacklist_pkey" PRIMARY KEY ("id")
);
