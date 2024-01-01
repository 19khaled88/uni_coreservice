/*
  Warnings:

  - Changed the type of `title` on the `academic_semesters` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `code` on the `academic_semesters` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "SemesterCode" AS ENUM ('ZERO_1', 'ZERO_2', 'ZERO_3');

-- CreateEnum
CREATE TYPE "SemesterTitle" AS ENUM ('Autumn', 'Summer', 'Fall');

-- AlterTable
ALTER TABLE "academic_semesters" DROP COLUMN "title",
ADD COLUMN     "title" "SemesterTitle" NOT NULL,
DROP COLUMN "code",
ADD COLUMN     "code" "SemesterCode" NOT NULL;
