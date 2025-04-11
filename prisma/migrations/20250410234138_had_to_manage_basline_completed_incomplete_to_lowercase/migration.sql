/*
  Warnings:

  - The values [COMPLETED,INCOMPLETE] on the enum `BaselineTestStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "BaselineTestStatus_new" AS ENUM ('completed', 'incomplete');
ALTER TABLE "users" ALTER COLUMN "baselineTest" DROP DEFAULT;
ALTER TABLE "users" ALTER COLUMN "baselineTest" TYPE "BaselineTestStatus_new" USING ("baselineTest"::text::"BaselineTestStatus_new");
ALTER TYPE "BaselineTestStatus" RENAME TO "BaselineTestStatus_old";
ALTER TYPE "BaselineTestStatus_new" RENAME TO "BaselineTestStatus";
DROP TYPE "BaselineTestStatus_old";
ALTER TABLE "users" ALTER COLUMN "baselineTest" SET DEFAULT 'incomplete';
COMMIT;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "baselineTest" SET DEFAULT 'incomplete';
