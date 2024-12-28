// import HistoricalAttendance from "../model/attendanceHistory.js";
// import { HTTPException } from "hono/http-exception";
// import { StatusCodes } from "http-status-codes";
// import { IAttendanceHistoryRepository } from "../types/repository.js"; // Import the new interface
// import {
//   AttendanceStatus,
//   IHistoricalAttendance,
//   IHistoricalAttendanceRepositoryType,
// } from "../types/database.js";

// class AttendanceHistoryRepository implements IAttendanceHistoryRepository {
//   private model: typeof HistoricalAttendance;

//   constructor() {
//     this.model = HistoricalAttendance;
//   }

//   public async create(
//     data: Partial<IHistoricalAttendanceRepositoryType>
//   ): Promise<IHistoricalAttendanceRepositoryType> {
//     const response = await this.model.create(data);
//     return response;
//   }

//   public async find(
//     args: Partial<any>,
//     options?: Record<string, unknown> | undefined
//   ): Promise<IHistoricalAttendanceRepositoryType[]> {
//     const response = await this.model.find(args, options);
//     return response;
//   }

//   public async findOne(
//     args: Partial<any>,
//     options?: Record<string, unknown> | undefined
//   ): Promise<IHistoricalAttendanceRepositoryType | null> {
//     const response = await this.model.findOne(args, options);
//     return response;
//   }

//   public async findById(
//     id: string,
//     fields?: string[] | undefined,
//     options?: {} | undefined
//   ): Promise<IHistoricalAttendanceRepositoryType | null> {
//     const response = await this.model.findById(id, fields, options);
//     return response;
//   }

//   public async findByIdAndDelete(id: string): Promise<boolean> {
//     const response = await this.model.findByIdAndDelete(id);
//     if (!response) {
//       throw new HTTPException(StatusCodes.BAD_REQUEST, {
//         message: "Failed to delete attendance archive",
//       });
//     }
//     return true;
//   }

//   public async findByIdAndUpdate(
//     id: string,
//     data: Partial<IHistoricalAttendanceRepositoryType>,
//     options: Record<string, unknown>
//   ): Promise<IHistoricalAttendance | null> {
//     const response = await this.model.findByIdAndUpdate(id, data, options);
//     return response;
//   }

//   public async getAttendanceByDateRange(
//     startDate: string,
//     endDate: string
//   ): Promise<IHistoricalAttendanceRepositoryType[]> {
//     const response = await this.model.find({
//       date: { $gte: new Date(startDate), $lte: new Date(endDate) },
//     });
//     if (!response || response.length === 0) {
//       throw new HTTPException(StatusCodes.NOT_FOUND, {
//         message: "No attendance records found for the given date range",
//       });
//     }
//     return response;
//   }

//   public async updateAttendanceStatus(
//     id: string,
//     status: string
//   ): Promise<IHistoricalAttendanceRepositoryType | null> {
//     const response = await this.model.findByIdAndUpdate(
//       id,
//       { status },
//       {
//         new: true,
//       }
//     );
//     if (!response) {
//       throw new HTTPException(StatusCodes.NOT_FOUND, {
//         message: "Attendance record not found to update",
//       });
//     }
//     return response;
//   }

//   public async generateReport(
//     args: Partial<IHistoricalAttendanceRepositoryType>
//   ): Promise<{ total: number; present: number; absent: number }> {
//     const records = await this.model.find(args);
//     if (!records || records.length === 0) {
//       throw new HTTPException(StatusCodes.NOT_FOUND, {
//         message: "No attendance records found for report generation",
//       });
//     }

//     const report = records.reduce(
//       (acc, record) => {
//         record.attendance.forEach((attendanceRecord) => {
//           acc.total += 1;
//           if (attendanceRecord.status === AttendanceStatus.PRESENT) {
//             acc.present += 1;
//           } else if (attendanceRecord.status === AttendanceStatus.ABSENT) {
//             acc.absent += 1;
//           }
//         });
//         return acc;
//       },
//       { total: 0, present: 0, absent: 0 }
//     );
//     return report;
//   }
// }

// export default new AttendanceHistoryRepository();
