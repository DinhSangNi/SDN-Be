import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from 'src/modules/user/schema/user.schema';
import { Lab } from 'src/modules/lab/schema/lab.schema';
import { BookingStatus } from '../types/booking.enum';

export type BookingDocument = Booking & Document;

@Schema({ timestamps: true })
export class Booking {
  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  user: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: Lab.name, required: true })
  lab: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Seat', required: true })
  seat: Types.ObjectId;

  @Prop({ type: Date, required: true })
  date: Date;

  @Prop({ type: Number, required: true, enum: [1, 2, 3, 4] })
  slot: 1 | 2 | 3 | 4;

  @Prop({
    required: true,
    enum: BookingStatus,
    default: BookingStatus.APPROVED,
  })
  status: BookingStatus;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
