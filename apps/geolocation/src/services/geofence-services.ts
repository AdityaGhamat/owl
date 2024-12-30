import { HTTPException } from "hono/http-exception";
import geofenceRepository from "../repository/geofence-repository.js";
import { IGeofence } from "../types/database/geofence.js";
import { geofenceCreation, members } from "../types/services/index.js";
import { StatusCodes } from "http-status-codes";
import { userCover } from "@repo/lib/cover";
import { IAuth } from "@repo/types/src/database.js";
import officeServices from "./office-services.js";
import serverConfig from "../config/server-config.js";
import axios from "axios";
import geolib from "geolib";
import MessageProducer from "../lib/queue/producer.js";
import userServices from "./user-services.js";
class GeofenceServices {
  async createFence(data: geofenceCreation) {
    let fence;
    try {
      fence = await geofenceRepository.create(data);
      if (!fence) {
        throw new HTTPException(StatusCodes.NOT_FOUND, {
          message: "Error occured while creating fence",
        });
      }
      return fence;
    } catch (error: any) {
      throw new HTTPException(StatusCodes.BAD_REQUEST, {
        message: "Problem occured while creating fence" + error.message,
      });
    }
  }
  async findFence(
    args?: Partial<{ name?: string | undefined; coordinates?: any } | {}>,
    options?: Record<string, unknown> | undefined
  ) {
    try {
      const fence = await geofenceRepository.find(args!, options);
      if (!fence) {
        throw new HTTPException(StatusCodes.NOT_FOUND, {
          message: "Fence not found",
        });
      }
      return fence;
    } catch (error: any) {
      throw new HTTPException(StatusCodes.BAD_REQUEST, {
        message: "Problem occured while finding fences" + error.message,
      });
    }
  }
  async findFenceById(id: string, fields?: string[], options?: {}) {
    try {
      const fence = await geofenceRepository.findById(id, fields, options);
      if (!fence) {
        throw new HTTPException(StatusCodes.NOT_FOUND, {
          message: "Fence not found",
        });
      }
      return fence;
    } catch (error: any) {
      throw new HTTPException(StatusCodes.BAD_REQUEST, {
        message: "Problem occured while finding fence" + error.message,
      });
    }
  }
  async findOneFence(
    args: Partial<{ name?: string | undefined; coordinates?: any }>,
    options?: Record<string, unknown> | undefined
  ) {
    try {
      const fence = await geofenceRepository.findOne(args, options);
      if (!fence) {
        throw new HTTPException(StatusCodes.NOT_FOUND, {
          message: "Fence not found",
        });
      }
      return fence;
    } catch (error: any) {
      throw new HTTPException(StatusCodes.BAD_REQUEST, {
        message: "Problem occured while finding fence" + error.message,
      });
    }
  }
  async findByIdAndUpdateFence(
    id: string,
    data: Partial<IGeofence>,
    options: Record<string, unknown>
  ) {
    try {
      const fenceCheck = await geofenceRepository.findById(id);
      if (!fenceCheck) {
        throw new HTTPException(StatusCodes.NOT_FOUND, {
          message: "fence not found",
        });
      }
      const fence = await geofenceRepository.findByIdAndUpdate(
        id,
        data,
        options
      );
      return fence;
    } catch (error: any) {
      throw new HTTPException(StatusCodes.BAD_REQUEST, {
        message: "Problem occured while finding fence" + error.message,
      });
    }
  }

  async deleteFence(id: string) {
    try {
      const fenceCheck = await geofenceRepository.findById(id);
      if (!fenceCheck) {
        throw new HTTPException(StatusCodes.NOT_FOUND, {
          message: "Fence is not found",
        });
      }
      const fence = await geofenceRepository.findByIdAndDelete(id);
      if (!fence) {
        throw new HTTPException(StatusCodes.BAD_REQUEST, {
          message: "fence cannot be deleted",
        });
      }
      return fence;
    } catch (error: any) {
      throw new HTTPException(StatusCodes.BAD_REQUEST, {
        message: "Problem occured while deleting fence" + error.message,
      });
    }
  }
  private async markAttendance(members: any, officeId: string) {
    try {
      const response = await axios.post<{ data: members }>(
        `${serverConfig.ATTENDANCE_SERVICE}/api/v1/attendance/mark-attendance?officeId=${officeId}`,
        members
      );
      //call here analytics service to check weather employee is present or not
      const result = response?.data?.data;
      return result;
    } catch (error: any) {
      throw new HTTPException(StatusCodes.BAD_REQUEST, {
        message: "Failed to mark attendance with attendance service",
      });
    }
  }
  private async markAttendanceByQueue(members: any, officeId: string) {
    try {
      const message = { members, officeId };
      console.log(members, officeId, "inside markAttendanceByQueue");
      const messageProducer = new MessageProducer(message);
      await messageProducer.markAttendance();
    } catch (error: any) {
      throw new HTTPException(StatusCodes.BAD_REQUEST, {
        message:
          "Failed to mark attendance with attendance service,error: " +
          error.message,
      });
    }
  }
  private coverMembers(members: IAuth[]) {
    const coveredMembers = members.map((member) => userCover(member));
    return coveredMembers;
  }
  async getMembersWithinRadius(office_id: string, radius: number) {
    const location = await officeServices.co_ordinatesOfOffice(office_id);
    const response = await axios.get<{ data: [IAuth] }>(
      `${serverConfig.AUTH_SERVICE}/api/v1/admin/users?lat=${location.coordinates[0]}&lng=${location.coordinates[1]}&rd=${radius}`
    );
    if (response.status !== 200) {
      throw new HTTPException(StatusCodes.NOT_FOUND, {
        message: "Members not found",
      });
    }
    const members = this.coverMembers(response.data?.data);
    // await this.markAttendance(members, office_id); apply this only in direct sync calls
    await this.markAttendanceByQueue(members, office_id);
    return members;
  }

  async distanceBetUserAndOffice(
    office: [number, number],
    user: [number, number]
  ) {
    const distance = geolib.getDistance(office, user);
    return distance;
  }
  async distance(office_id: string, employee_id: string) {
    const [office, user] = await Promise.all([
      officeServices.co_ordinatesOfOffice(office_id),
      userServices.co_ordinatesOfOffice(employee_id),
    ]);
    // console.log(office, "office");
    // console.log(user, "user");
    // const office_coordinates = office.coordinates;
    const distance = await this.distanceBetUserAndOffice(
      office.coordinates,
      user
    );
    return distance;
  }
}

export default new GeofenceServices();
