import { ICrudRepositoryOrganization } from "@repo/types/src/common.js";
import HistoricalAttendance from "../model/attendanceHistory.js";
import {
  IHistoricalAttendance,
  IHistoricalAttendanceRepositoryType,
} from "../types/database.js";
import { HTTPException } from "hono/http-exception";
import { StatusCodes } from "http-status-codes";
class AttendanceHistoryRepository
  implements ICrudRepositoryOrganization<IHistoricalAttendanceRepositoryType>
{
  private model: typeof HistoricalAttendance;
  constructor() {
    this.model = HistoricalAttendance;
  }
  public async create(
    data: Partial<IHistoricalAttendanceRepositoryType>
  ): Promise<IHistoricalAttendanceRepositoryType> {
    const response = await this.model.create(data);
    return response;
  }
  public async find(
    args: Partial<any>,
    options?: Record<string, unknown> | undefined
  ): Promise<IHistoricalAttendanceRepositoryType[]> {
    const response = await this.model.find(args, options);
    return response;
  }
  public async findOne(
    args: Partial<any>,
    options?: Record<string, unknown> | undefined
  ): Promise<IHistoricalAttendanceRepositoryType | null> {
    const response = await this.model.findOne(args, options);
    return response;
  }
  public async findById(
    id: string,
    fields?: string[] | undefined,
    options?: {} | undefined
  ): Promise<IHistoricalAttendanceRepositoryType | null> {
    const response = await this.model.findById(id, fields, options);
    return response;
  }
  public async findByIdAndDelete(id: string): Promise<boolean> {
    const response = await this.model.findByIdAndDelete(id);
    if (!response) {
      throw new HTTPException(StatusCodes.BAD_REQUEST, {
        message: "Failed to delete attendance archive",
      });
    }
    return true;
  }
  public async findByIdAndUpdate(
    id: string,
    data: Partial<IHistoricalAttendanceRepositoryType>,
    options: Record<string, unknown>
  ): Promise<IHistoricalAttendance | null> {
    const response = await this.model.findByIdAndUpdate(id, data, options);
    return response;
  }
}

export default new AttendanceHistoryRepository();
