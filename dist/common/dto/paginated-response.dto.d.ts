export declare class PaginatedResponse<T> {
    data: T[];
    meta: {
        page: number;
        limit: number;
        totalItems: number;
        totalPages: number;
    };
    constructor(data: T[], page: number, limit: number, totalItems: number);
}
