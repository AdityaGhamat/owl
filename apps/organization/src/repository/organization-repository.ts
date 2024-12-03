import { FilterQuery, Model } from "mongoose";
import { ICrudRepositoryOrganization } from "@repo/types/dist/common.js";
import { IOrganization } from "../types/database/organization-type.js";
import Organization from "../models/organization-model.js";

class OrganizationRepository
  implements ICrudRepositoryOrganization<IOrganization>
{
  private model: Model<IOrganization>;

  constructor() {
    this.model = Organization;
  }

  async create(data: Partial<IOrganization>): Promise<IOrganization> {
    const createdOrganization = await this.model.create(data);
    return createdOrganization.toObject() as IOrganization;
  }

  async find(
    args: Partial<IOrganization>,
    options?: Record<string, unknown>
  ): Promise<IOrganization[]> {
    return this.model
      .find(args as FilterQuery<IOrganization>, null, options)
      .lean<IOrganization[]>()
      .exec();
  }

  async findOne(
    args: FilterQuery<IOrganization>,
    options?: Record<string, unknown>
  ): Promise<IOrganization | null> {
    return this.model.findOne(args, null, options).lean<IOrganization>().exec();
  }

  async findById(
    id: string,
    fields?: string[],
    options?: Record<string, unknown>
  ): Promise<IOrganization | null> {
    const projection = fields ? fields.join(" ") : null;
    return this.model
      .findById(id, projection, options)
      .lean<IOrganization>()
      .exec();
  }

  async findByIdAndUpdate(
    id: string,
    data: Partial<IOrganization>,
    options: Record<string, unknown> = { new: true }
  ): Promise<IOrganization | null> {
    const org = await this.model
      .findByIdAndUpdate({ _id: id }, data, options)
      .lean<IOrganization>()
      .exec();
    return org;
  }

  async findByIdAndDelete(id: string): Promise<boolean> {
    const result = await this.model.findByIdAndDelete(id);
    return !!result;
  }
}

export default new OrganizationRepository();
