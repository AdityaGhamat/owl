export interface ICrudRepository<T, K> {
  create(data: T): Promise<T>;
  findFirst(args: any): Promise<T | null>;
  findMany(args: any): Promise<T[]>;
  findUnique(id: K): Promise<T | null>;
  update(id: K, data: Partial<T>): Promise<T>;
  updateMany(conditions: any, data: Partial<T>): Promise<number>;
  delete(id: K): Promise<T>;
  deleteMany(conditions: any): Promise<number>;
  count(args: any): Promise<number>;
}
