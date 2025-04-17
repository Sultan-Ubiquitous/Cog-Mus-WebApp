/*
  Warnings:

  - The `ListenedToRagas` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `MusicalBackground` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "users" ALTER COLUMN "Age" SET DATA TYPE TEXT,
DROP COLUMN "ListenedToRagas",
ADD COLUMN     "ListenedToRagas" TEXT,
DROP COLUMN "MusicalBackground",
ADD COLUMN     "MusicalBackground" TEXT;
