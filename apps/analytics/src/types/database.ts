import { z } from "zod";
import {
  AttendanceAnalyticsCreation,
  EmployeeAnalyticsCreation,
  OfficeAnalyticsCreation,
} from "@repo/validations/analytics";

export type AttendanceAnalyticsCreationType = z.infer<
  typeof AttendanceAnalyticsCreation
>;

export type EmployeeAnalyticsCreationType = z.infer<
  typeof EmployeeAnalyticsCreation
>;

export type OfficeAnalyticsCreationType = z.infer<
  typeof OfficeAnalyticsCreation
>;
