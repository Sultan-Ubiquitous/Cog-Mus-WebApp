/*
  Warnings:

  - The values [Male,Female] on the enum `Sex` will be removed. If these variants are still used in the database, this will fail.
  - The values [Yes,No] on the enum `YesNo` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Sex_new" AS ENUM ('male', 'female');
ALTER TABLE "users" ALTER COLUMN "Sex" TYPE "Sex_new" USING ("Sex"::text::"Sex_new");
ALTER TYPE "Sex" RENAME TO "Sex_old";
ALTER TYPE "Sex_new" RENAME TO "Sex";
DROP TYPE "Sex_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "YesNo_new" AS ENUM ('yes', 'no');
ALTER TABLE "users" ALTER COLUMN "MusicalBackground" TYPE "YesNo_new" USING ("MusicalBackground"::text::"YesNo_new");
ALTER TABLE "users" ALTER COLUMN "ListenedToRagas" TYPE "YesNo_new" USING ("ListenedToRagas"::text::"YesNo_new");
ALTER TYPE "YesNo" RENAME TO "YesNo_old";
ALTER TYPE "YesNo_new" RENAME TO "YesNo";
DROP TYPE "YesNo_old";
COMMIT;
