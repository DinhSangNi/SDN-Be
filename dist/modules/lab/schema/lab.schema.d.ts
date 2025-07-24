import { Document, Types } from 'mongoose';
import { LabStatus } from '../types/lab.enum';
export type LabDocument = Lab & Document;
export declare class Lab {
    name: string;
    description?: string;
    location?: string;
    status?: LabStatus;
    totalSeats: number;
    createdBy: string;
    updatedBy: string;
}
export declare const LabSchema: import("mongoose").Schema<Lab, import("mongoose").Model<Lab, any, any, any, Document<unknown, any, Lab, any> & Lab & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Lab, Document<unknown, {}, import("mongoose").FlatRecord<Lab>, {}> & import("mongoose").FlatRecord<Lab> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
