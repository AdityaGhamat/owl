import { ICrudRepositoryGeolocation } from "@repo/types/src/common.js";
import Geofence from "../models/geofence.js";
import { IGeofence } from "../types/database/geofence.js";

class GeofenceRepository
  implements
    ICrudRepositoryGeolocation<IGeofence, { name?: string; coordinates?: any }>
{
  async create(data: Partial<IGeofence>) {
    const geofence = new Geofence(data);
    return await geofence.save();
  }
  async find(
    args: Partial<{ name?: string | undefined; coordinates?: any }>,
    options?: Record<string, unknown> | undefined
  ): Promise<IGeofence[]> {
    return await Geofence.find(args, null, options).exec();
  }
  async findById(
    id: string,
    fields?: string[] | undefined,
    options?: {} | undefined
  ): Promise<IGeofence | null> {
    return await Geofence.findById(id, fields?.join(" "), options).exec();
  }
  async findOne(
    args: Partial<{ name?: string | undefined; coordinates?: any }>,
    options?: Record<string, unknown> | undefined
  ): Promise<IGeofence | null> {
    return await Geofence.findOne(args, null, options).exec();
  }

  async findByIdAndUpdate(
    id: string,
    data: Partial<IGeofence>,
    options: Record<string, unknown>
  ): Promise<IGeofence | null> {
    return await Geofence.findByIdAndUpdate(id, data, {
      new: true,
      ...options,
    }).exec();
  }
  async findByIdAndDelete(id: string): Promise<boolean> {
    const fence = await Geofence.findByIdAndDelete(id);
    if (!fence) {
      return false;
    }
    return true;
  }

  async findWithinPolygon(
    point: [number, number]
  ): Promise<IGeofence[] | null> {
    return await Geofence.find({
      coordinates: {
        $geoIntersects: {
          $geometry: {
            type: "Point",
            coordinates: point,
          },
        },
      },
    }).exec();
  }

  async findNearPoint(
    point: [number, number],
    maxDistance: number
  ): Promise<IGeofence[] | null> {
    return await Geofence.find({
      center: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: point,
          },
          $maxDistance: maxDistance,
        },
      },
    }).exec();
  }
}

export default new GeofenceRepository();
