-- CreateEnum
CREATE TYPE "GroupType" AS ENUM ('intervention', 'nonintervention');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "group" "GroupType" NOT NULL DEFAULT 'nonintervention';
