import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Seat } from 'src/modules/seat/schemas/seat.schema';
import { LabStatus } from '../types/lab.enum';

export type LabDocument = Lab & Document;

@Schema({ timestamps: true })
export class Lab {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop()
  description?: string;

  @Prop()
  location?: string;

  @Prop({ enum: LabStatus, default: LabStatus.ACTIVE })
  status?: LabStatus;

  @Prop()
  totalSeats: number;

  @Prop({ type: Types.ObjectId, ref: 'User', default: null })
  createdBy: string;

  @Prop({ type: Types.ObjectId, ref: 'User', default: null })
  updatedBy: string;
}

export const LabSchema = SchemaFactory.createForClass(Lab);

LabSchema.virtual('seats', {
  ref: 'Seat',
  localField: '_id',
  foreignField: 'lab',
});

LabSchema.set('toJSON', { virtuals: true });
LabSchema.set('toObject', { virtuals: true });
