-- CreateEnum
CREATE TYPE "SeverityLeveL" AS ENUM ('INFO', 'WARN', 'ERROR');

-- CreateTable
CREATE TABLE "LogModel" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "message" TEXT NOT NULL,
    "origin" TEXT NOT NULL,
    "level" "SeverityLeveL" NOT NULL,

    CONSTRAINT "LogModel_pkey" PRIMARY KEY ("id")
);
