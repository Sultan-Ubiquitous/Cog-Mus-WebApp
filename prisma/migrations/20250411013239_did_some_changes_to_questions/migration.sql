/*
  Warnings:

  - You are about to drop the column `feeling` on the `feedbacks` table. All the data in the column will be lost.
  - You are about to drop the column `focusEffect` on the `feedbacks` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "feedbacks" DROP COLUMN "feeling",
DROP COLUMN "focusEffect",
ADD COLUMN     "comprehension" TEXT,
ADD COLUMN     "difficulty" TEXT,
ADD COLUMN     "engagement" TEXT;
