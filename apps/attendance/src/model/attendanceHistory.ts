import { Schema, model } from "mongoose";
import {
  IHistoricalAttendance,
  AttendanceStatus,
  CheckInMode,
} from "../types/database.js";

const attendanceHistorySchema = new Schema<IHistoricalAttendance>({
  employeeId: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  attendance: [
    {
      checkInTime: { type: Date, required: true },
      checkOutTime: { type: Date, required: true },
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
