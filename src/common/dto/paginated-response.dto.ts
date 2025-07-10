export class PaginatedResponse<T> {
  data: T[];
  meta: {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
  };

  constructor(data: T[], page: number, limit: number, totalItems: number) {
    this.data = data;
    this.meta = {
      page,
      limit,
      totalItems,
      totalPages: Math.ceil(totalItems / limit),
    };
  }
}
