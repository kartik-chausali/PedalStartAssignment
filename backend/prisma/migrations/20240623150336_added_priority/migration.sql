-- CreateEnum
CREATE TYPE "Priority" AS ENUM ('URGENT', 'IMPORTANT', 'NORMAL');

-- AlterTable
ALTER TABLE "Todo" ADD COLUMN     "priority" "Priority" NOT NULL DEFAULT 'NORMAL';
