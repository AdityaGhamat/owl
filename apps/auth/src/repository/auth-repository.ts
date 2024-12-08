import { ICrudRepositoryOrganization } from "@repo/types/src/common.js";
import { Model, Document, FilterQuery } from "mongoose";
import IAuth from "../types/database/index.js"; // Define the IAuth interface
import User from "../models/auth.js";

class AuthRepository implements ICrudRepositoryOrganization<IAuth> {
  constructor(private model: Model<IAuth & Document>) {}

  async create(data: Partial<IAuth>): Promise<IAuth> {
    return this.model.create(data);
  }

  async find(
    args: FilterQuery<IAuth>,
    options?: Record<string, unknown>
  ): Promise<IAuth[]> {
    return this.model.find(args, options).lean().exec() as Promise<IAuth[]>;
  }

  async findOne(
    args: FilterQuery<IAuth>,
    options?: Record<string, unknown>
  ): Promise<IAuth | null> {
    return (await this.model
      .findOne(args, options)
      ?.lean()
      .exec()) as IAuth | null;
  }

  async findById(
    id: string,
    fields?: string[],
    options?: {}
  ): Promise<IAuth | null> {
    return this.model.findById(id, fields, options);
  }

  async findByIdAndUpdate(
    id: string,
    data: Partial<IAuth>,
    options: Record<string, unknown>
  ): Promise<IAuth | null> {
    return this.model.findByIdAndUpdate(id, data, options);
  }

  async findByIdAndDelete(id: string): Promise<boolean> {
    const result = await this.model.findByIdAndDelete(id);
    return result !== null;
  }

  async updateByEmail(
    email: string,
    data: Partial<IAuth>
  ): Promise<IAuth | null> {
    return this.model.findOneAndUpdate(
      { email },
      { $set: data },
      { new: true }
    );
  }

  async checkPasswordResetToken(reset_token: string): Promise<IAuth | null> {
    return this.model.findOne({ reset_password_token: reset_token });
  }

  async findByEmail(email: string): Promise<IAuth | null> {
    return this.model.findOne({ email });
  }
}

export default new AuthRepository(User);
