-- CreateTable
CREATE TABLE "AttendanceAnalytics" (
    "id" UUID NOT NULL,
    "attendanceDate" TIMESTAMP(3) NOT NULL,
    "officeId" TEXT NOT NULL,
    "totalEmployees" INTEGER NOT NULL,
    "employeeCountByStatus" JSONB NOT NULL,
    "avgCheckInTime" DOUBLE PRECISION NOT NULL,
    "avgCheckOutTime" DOUBLE PRECISION NOT NULL,
    "avgLatePercentage" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AttendanceAnalytics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmployeeAnalytics" (
    "id" UUID NOT NULL,
    "employeeId" TEXT NOT NULL,
    "officeId" TEXT NOT NULL,
    "totalDaysPresent" INTEGER NOT NULL,
    "totalDaysAbsent" INTEGER NOT NULL,
    "totalDaysOnLeave" INTEGER NOT NULL,
    "lateCount" INTEGER NOT NULL,
    "avgCheckInTime" DOUBLE PRECISION NOT NULL,
    "avgCheckOutTime" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EmployeeAnalytics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OfficeAnalytics" (
    "id" UUID NOT NULL,
    "officeId" TEXT NOT NULL,
    "attendanceDate" TIMESTAMP(3) NOT NULL,
    "totalEmployeesPresent" INTEGER NOT NULL,
    "totalEmployeesAbsent" INTEGER NOT NULL,
    "totalEmployeesOnLeave" INTEGER NOT NULL,
    "avgEmployeesLate" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OfficeAnalytics_pkey" PRIMARY KEY ("id")
);
