import Office from "../models/office-model.js";
import { ICrudRepositoryOrganization } from "@repo/types/src/common.js";
import { IOffice } from "../types/database/index.js";
import { Model } from "mongoose";

class OfficeRepository implements ICrudRepositoryOrganization<IOffice> {
  private model: Model<IOffice>;
  constructor() {
    this.model = Office;
  }
  async create(data: Partial<IOffice>): Promise<IOffice> {
    const office = await this.model.create(data);
    return office;
  }
  async find(
    args: Partial<any>,
    options?: Record<string, unknown> | undefined
  ): Promise<IOffice[]> {
    const office = await this.model.find(args, options);
    return office;
  }
  async findById(
    id: string,
    fields?: string[] | undefined,
    options?: {} | undefined
  ): Promise<IOffice | null> {
    const office = await this.model.findById(id, fields, options);
    return office;
  }
  async findOne(
    args: Partial<any>,
    options?: Record<string, unknown> | undefined
  ): Promise<IOffice | null> {
    console.log(args);
    const office = await this.model.findOne({ ...args }, null, options);
    console.log(office);
    return office;
  }

  async findByIdAndUpdate(
    id: string,
    data: Partial<IOffice>,
    options: Record<string, unknown>
  ): Promise<IOffice | null> {
    const office = await this.model.findByIdAndUpdate(id, data, options);
    return office;
  }
  async findByIdAndDelete(id: string): Promise<boolean> {
    const office = await this.model.findByIdAndDelete(id);
    if (!office) {
      return false;
    }
    return true;
  }
}

export default new OfficeRepository();
