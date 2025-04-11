/*
  Warnings:

  - You are about to drop the column `comprehension` on the `feedbacks` table. All the data in the column will be lost.
  - You are about to drop the column `difficulty` on the `feedbacks` table. All the data in the column will be lost.
  - You are about to drop the column `engagement` on the `feedbacks` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "feedbacks" DROP COLUMN "comprehension",
DROP COLUMN "difficulty",
DROP COLUMN "engagement",
ADD COLUMN     "attentionChallenge" INTEGER,
ADD COLUMN     "calmnessRating" INTEGER,
ADD COLUMN     "distractionFrequency" INTEGER,
ADD COLUMN     "focusDifficulty" INTEGER,
ADD COLUMN     "frustrationLevel" TEXT,
ADD COLUMN     "mindWandering" INTEGER,
ADD COLUMN     "musicInfluence" TEXT,
ADD COLUMN     "performanceImprovement" TEXT,
ADD COLUMN     "strategyUse" TEXT,
ADD COLUMN     "taskPrioritization" TEXT;
