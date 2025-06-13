-- CreateEnum
CREATE TYPE "StatusTask" AS ENUM ('TASK', 'IN_PROGRESS', 'COMPLITED');

-- CreateTable
CREATE TABLE "Task" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "descriptions" TEXT NOT NULL,
    "status_task" "StatusTask" NOT NULL DEFAULT 'TASK',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);
