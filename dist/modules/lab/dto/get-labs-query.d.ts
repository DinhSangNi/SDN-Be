import { LabStatus } from '../types/lab.enum';
export declare class GetLabsQuery {
    keyword?: string;
    status?: LabStatus;
    page?: number;
    limit?: number;
}
