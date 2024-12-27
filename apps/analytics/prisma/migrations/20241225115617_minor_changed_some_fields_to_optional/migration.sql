-- AlterTable
ALTER TABLE "EmployeeAnalytics" ALTER COLUMN "totalDaysPresent" DROP NOT NULL,
ALTER COLUMN "totalDaysAbsent" DROP NOT NULL,
ALTER COLUMN "totalDaysOnLeave" DROP NOT NULL,
ALTER COLUMN "lateCount" DROP NOT NULL;

-- AlterTable
ALTER TABLE "OfficeAnalytics" ALTER COLUMN "totalEmployeesPresent" DROP NOT NULL,
ALTER COLUMN "totalEmployeesAbsent" DROP NOT NULL,
ALTER COLUMN "totalEmployeesOnLeave" DROP NOT NULL;
