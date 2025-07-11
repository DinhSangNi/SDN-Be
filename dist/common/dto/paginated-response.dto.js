"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginatedResponse = void 0;
class PaginatedResponse {
    data;
    meta;
    constructor(data, page, limit, totalItems) {
        this.data = data;
        this.meta = {
            page,
            limit,
            totalItems,
            totalPages: Math.ceil(totalItems / limit),
        };
    }
}
exports.PaginatedResponse = PaginatedResponse;
//# sourceMappingURL=paginated-response.dto.js.map