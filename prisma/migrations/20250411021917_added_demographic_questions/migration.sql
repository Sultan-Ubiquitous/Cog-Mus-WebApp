-- CreateEnum
CREATE TYPE "Sex" AS ENUM ('Male', 'Female');

-- CreateEnum
CREATE TYPE "YesNo" AS ENUM ('Yes', 'No');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "Age" INTEGER,
ADD COLUMN     "ListenedToRagas" "YesNo",
ADD COLUMN     "MusicalBackground" "YesNo",
ADD COLUMN     "Sex" "Sex";
