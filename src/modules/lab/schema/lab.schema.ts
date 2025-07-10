import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LabDocument = Lab & Document;

@Schema({ timestamps: true })
export class Lab {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop()
  description?: string;

  @Prop()
  location?: string;
}

export const LabSchema = SchemaFactory.createForClass(Lab);
