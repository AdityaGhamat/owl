-- AlterTable
ALTER TABLE "Attendance" ALTER COLUMN "status" DROP NOT NULL,
ALTER COLUMN "checkInMode" DROP NOT NULL,
ALTER COLUMN "isLate" DROP NOT NULL;
