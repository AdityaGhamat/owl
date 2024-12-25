-- AlterTable
ALTER TABLE "AttendanceAnalytics" ALTER COLUMN "avgCheckInTime" DROP NOT NULL,
ALTER COLUMN "avgCheckOutTime" DROP NOT NULL,
ALTER COLUMN "avgLatePercentage" DROP NOT NULL;

-- AlterTable
ALTER TABLE "EmployeeAnalytics" ALTER COLUMN "avgCheckInTime" DROP NOT NULL,
ALTER COLUMN "avgCheckOutTime" DROP NOT NULL;

-- AlterTable
ALTER TABLE "OfficeAnalytics" ALTER COLUMN "avgEmployeesLate" DROP NOT NULL;
