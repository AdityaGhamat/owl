export interface ICrudRepository<T, K> {
  //this one is for prisma
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

export interface ICrudRepositoryGeolocation<T, K = any> {
  //for mongoose
  create(data: Partial<T>): Promise<T>;
  find(args: Partial<K>, options?: Record<string, unknown>): Promise<T[]>;
  findOne(
    args: Partial<K>,
    options?: Record<string, unknown>
  ): Promise<T | null>;
  findById(id: string, fields?: string[], options?: {}): Promise<T | null>;
  findByIdAndUpdate(
    id: string,
    data: Partial<T>,
    options: Record<string, unknown>
  ): Promise<T | null>;
  findByIdAndDelete(id: string): Promise<boolean>;
  findWithinPolygon(point: [number, number]): Promise<T[] | null>;
  findNearPoint(
    point: [number, number],
    maxDistance: number
  ): Promise<T[] | null>;
}

export interface ICrudRepositoryOrganization<T, K = any> {
  //for mongoose
  create(data: Partial<T>): Promise<T>;
  find(args: Partial<K>, options?: Record<string, unknown>): Promise<T[]>;
  findOne(
    args: Partial<K>,
    options?: Record<string, unknown>
  ): Promise<T | null>;
  findById(id: string, fields?: string[], options?: {}): Promise<T | null>;
  findByIdAndUpdate(
    id: string,
    data: Partial<T>,
    options: Record<string, unknown>
  ): Promise<T | null>;
  findByIdAndDelete(id: string): Promise<boolean>;
}
