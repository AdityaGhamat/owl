import { Schema, model } from "mongoose";
import {
  IHistoricalAttendance,
  AttendanceStatus,
  CheckInMode,
} from "../types/database.js";

const attendanceHistorySchema = new Schema<IHistoricalAttendance>({
  date: {
    type: Date,
    required: true,
  },
  attendance: [
    {
      officeId: { type: String, required: true }, // Added officeId in attendance array
      employeeId: { type: String, required: true }, // Added employeeId in attendance array
      checkInTime: { type: Date, default: null },
      checkOutTime: { type: Date, default: null },
      status: {
        type: String,
        enum: Object.values(AttendanceStatus),
        required: true,
      },
      checkInMode: {
        type: String,
        enum: Object.values(CheckInMode),
        required: true,
      },
      isLate: { type: Boolean, default: false, required: true },
    },
  ],
});

const HistoricalAttendance = model<IHistoricalAttendance>(
  "HistoricalAttendance",
  attendanceHistorySchema
);

export default HistoricalAttendance;
