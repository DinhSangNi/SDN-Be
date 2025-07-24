import { Document, Types } from 'mongoose';
import { BookingStatus } from '../types/booking.enum';
export type BookingDocument = Booking & Document;
export declare class Booking {
    user: Types.ObjectId;
    lab: Types.ObjectId;
    seat: Types.ObjectId;
    date: Date;
    slot: 1 | 2 | 3 | 4;
    status: BookingStatus;
}
export declare const BookingSchema: import("mongoose").Schema<Booking, import("mongoose").Model<Booking, any, any, any, Document<unknown, any, Booking, any> & Booking & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Booking, Document<unknown, {}, import("mongoose").FlatRecord<Booking>, {}> & import("mongoose").FlatRecord<Booking> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
