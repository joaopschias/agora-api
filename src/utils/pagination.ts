import { FindManyOptions, ObjectLiteral, Repository } from 'typeorm';

export interface PaginationOptions {
  page?: number;
  limit?: number;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

/**
 * Generic pagination utility for TypeORM repositories.
 *
 * @param repo - TypeORM repository
 * @param options - Pagination options (page & limit)
 * @param findOptions - Additional TypeORM find options
 * @returns Paginated data
 */
export async function paginate<T extends ObjectLiteral>(
  repo: Repository<T>,
  options: PaginationOptions,
  findOptions: FindManyOptions<T> = {}
): Promise<PaginatedResult<T>> {
  const page = options.page && options.page > 0 ? options.page : 1;
  const limit = options.limit && options.limit > 0 ? options.limit : 10;
  const skip = (page - 1) * limit;

  const [data, total] = await repo.findAndCount({
    ...findOptions,
    take: limit,
    skip,
  });

  return {
    data,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
}
