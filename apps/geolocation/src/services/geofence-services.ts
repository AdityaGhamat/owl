import { HTTPException } from "hono/http-exception";
import geofenceRepository from "../repository/geofence-repository.js";
import { IGeofence } from "../types/database/geofence.js";
import { geofenceCreation } from "../types/services/index.js";
import { StatusCodes } from "http-status-codes";

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

  async findMembersWithPolygon(point: [number, number]) {
    try {
      const members = await geofenceRepository.findWithinPolygon(point);
      return members;
    } catch (error: any) {
      throw new HTTPException(StatusCodes.BAD_REQUEST, {
        message: "Could not find the members" + error.message,
      });
    }
  }
  async findMembersWithCircle(point: [number, number], maxDistance: number) {
    try {
      const members = await geofenceRepository.findNearPoint(
        point,
        maxDistance
      );
      return members;
    } catch (error: any) {
      throw new HTTPException(StatusCodes.BAD_REQUEST, {
        message: "Could not find the members" + error.message,
      });
    }
  }
}

export default new GeofenceServices();
