import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { SeatStatus } from '../types/seat.enum';

@Schema()
export class Seat {
  @Prop({ required: true })
  seatNumber: string;

  @Prop({ type: Types.ObjectId, ref: 'Lab', required: true })
  lab: Types.ObjectId;

  @Prop({ type: String, enum: SeatStatus, default: SeatStatus.AVAILABLE })
  status: SeatStatus;
}

export type SeatDocument = Seat & Document;
export const SeatSchema = SchemaFactory.createForClass(Seat);
