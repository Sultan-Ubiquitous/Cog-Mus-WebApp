-- CreateEnum
CREATE TYPE "BaselineTestStatus" AS ENUM ('COMPLETED', 'INCOMPLETE');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "baselineTest" "BaselineTestStatus" NOT NULL DEFAULT 'INCOMPLETE';
