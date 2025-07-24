import { Document, Types } from 'mongoose';
import { SeatStatus } from '../types/seat.enum';
export declare class Seat {
    seatNumber: string;
    lab: Types.ObjectId;
    status: SeatStatus;
}
export type SeatDocument = Seat & Document;
export declare const SeatSchema: import("mongoose").Schema<Seat, import("mongoose").Model<Seat, any, any, any, Document<unknown, any, Seat, any> & Seat & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Seat, Document<unknown, {}, import("mongoose").FlatRecord<Seat>, {}> & import("mongoose").FlatRecord<Seat> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
