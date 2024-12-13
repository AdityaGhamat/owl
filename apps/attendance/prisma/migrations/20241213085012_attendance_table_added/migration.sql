-- CreateEnum
CREATE TYPE "AttendanceStatus" AS ENUM ('PRESENT', 'ABSENT', 'ON_LEAVE', 'EXCUSED');

-- CreateEnum
CREATE TYPE "CheckInMode" AS ENUM ('MANUAL', 'AUTOMATIC');

-- CreateTable
CREATE TABLE "Attendance" (
    "id" UUID NOT NULL,
    "employeeId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "checkInTime" TIME,
    "checkOutTime" TIME,
    "status" "AttendanceStatus" NOT NULL,
    "checkInMode" "CheckInMode" NOT NULL,
    "isLate" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Attendance_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "employeeIdIndex" ON "Attendance"("employeeId");

-- CreateIndex
CREATE INDEX "dateIndex" ON "Attendance"("date");

-- CreateIndex
CREATE INDEX "employeeIdDateIndex" ON "Attendance"("employeeId", "date");

-- CreateIndex
CREATE INDEX "statusIndex" ON "Attendance"("status");

-- CreateIndex
CREATE INDEX "checkInModeIndex" ON "Attendance"("checkInMode");
