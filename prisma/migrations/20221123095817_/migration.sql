/*
  Warnings:

  - You are about to drop the column `interview` on the `Applicant` table. All the data in the column will be lost.
  - You are about to drop the column `quiz_score` on the `Applicant` table. All the data in the column will be lost.
  - You are about to drop the `_ApplicantToJob` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ApplicantToJob" DROP CONSTRAINT "_ApplicantToJob_A_fkey";

-- DropForeignKey
ALTER TABLE "_ApplicantToJob" DROP CONSTRAINT "_ApplicantToJob_B_fkey";

-- AlterTable
ALTER TABLE "Applicant" DROP COLUMN "interview",
DROP COLUMN "quiz_score";

-- DropTable
DROP TABLE "_ApplicantToJob";

-- CreateTable
CREATE TABLE "JobApplicants" (
    "id" SERIAL NOT NULL,
    "jobId" INTEGER,
    "applicantId" INTEGER,
    "quiz_score" INTEGER NOT NULL DEFAULT -1,
    "interview" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "JobApplicants_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "JobApplicants" ADD CONSTRAINT "JobApplicants_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobApplicants" ADD CONSTRAINT "JobApplicants_applicantId_fkey" FOREIGN KEY ("applicantId") REFERENCES "Applicant"("id") ON DELETE SET NULL ON UPDATE CASCADE;
