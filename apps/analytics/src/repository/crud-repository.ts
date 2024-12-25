import { PrismaClient } from "@prisma/client";
import { ICrudRepository } from "@repo/types/src/common.js";

export class CrudRepository<T, K> implements ICrudRepository<T, K> {
  constructor(
    protected prisma: PrismaClient,
    protected model: any
  ) {
    this.prisma = prisma;
    this.model = model;
  }

  async create(data: T): Promise<T> {
    return this.model.create({ data });
  }

  async findFirst(args: any): Promise<T | null> {
    return this.model.findFirst({
      where: {
        email: args,
      },
    });
  }

  async findMany(args: any): Promise<T[]> {
    return this.model.findMany(args);
  }

  async findUnique(id: K): Promise<T | null> {
    return this.model.findUnique({
      where: { id },
    });
  }

  async update(id: K, data: Partial<T>): Promise<T> {
    return this.model.update({
      where: { id },
      data,
    });
  }

  async updateMany(conditions: any, data: Partial<T>): Promise<number> {
    const { count } = await this.model.updateMany({
      where: conditions,
      data,
    });
    return count;
  }

  async delete(id: K): Promise<T> {
    return this.model.delete({
      where: { id },
    });
  }

  async deleteMany(conditions: any): Promise<number> {
    const { count } = await this.model.deleteMany({
      where: conditions,
    });
    return count;
  }

  async count(args: any): Promise<number> {
    return this.model.count(args);
  }
}

export default CrudRepository;
