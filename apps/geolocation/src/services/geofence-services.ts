import { HTTPException } from "hono/http-exception";
import geofenceRepository from "../repository/geofence-repository.js";
import { IGeofence } from "../types/database/geofence.js";
import { geofenceCreation } from "../types/services/index.js";
import { StatusCodes } from "http-status-codes";
import { userCover } from "@repo/lib/cover";
import { IAuth } from "@repo/types/src/database.js";
import officeServices from "./office-services.js";
import serverConfig from "../config/server-config.js";
import axios from "axios";
import geolib from "geolib";
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

  private coverMembers(members: IAuth[]) {
    const coveredMembers = members.map((member) => userCover(member));
    return coveredMembers;
  }
  async getMembersWithinRadius(office_id: string, radius: number) {
    const co_ordinates: [number, number] =
      await officeServices.co_ordinatesOfOffice(office_id);
    const response = await axios.get<{ data: [IAuth] }>(
      `${serverConfig.AUTH_SERVICE}/api/v1/admin/users?lat=${co_ordinates[0]}&lng=${co_ordinates[1]}&rd=${radius}`
    );
    if (response.status !== 200) {
      throw new HTTPException(StatusCodes.NOT_FOUND, {
        message: "Members not found",
      });
    }
    const members = response.data?.data;
    return this.coverMembers(members);
  }

  async distanceBetUserAndOffice(office_id: string) {
    const request = await axios.get<{ data: [number, number] }>(
      `${serverConfig.AUTH_SERVICE}/api/v1/user/location`
    );
    if (request.status !== 200) {
      throw new HTTPException(StatusCodes.BAD_REQUEST, {
        message: "Failed request to auth service",
      });
    }
    const user_coordinates = request.data.data;
    console.log(user_coordinates, "inside services");
    const office_co_ordinates: [number, number] =
      await officeServices.co_ordinatesOfOffice(office_id);
    const distance = geolib.getDistance(office_co_ordinates, user_coordinates);
    return distance;
  }
}

export default new GeofenceServices();
