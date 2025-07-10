import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MediaDocument = Media & Document;

@Schema({ timestamps: true })
export class Media {
  @Prop({ required: true })
  url: string;

  @Prop({ required: true })
  publicId: string;

  @Prop({ default: 'image' })
  type: string;

  @Prop()
  name?: string;

  @Prop()
  size?: number;

  @Prop()
  uploadedBy?: string;

  @Prop({ default: true })
  isTemporary: boolean;

  @Prop()
  relatedTo?: string;

  @Prop()
  description?: string;
}

export const MediaSchema = SchemaFactory.createForClass(Media);
