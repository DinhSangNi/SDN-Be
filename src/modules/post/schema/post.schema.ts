import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { PostType } from '../dto/create-post.dto';

export type PostDocument = Post & Document;

@Schema({ timestamps: true })
export class Post {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string; // HTML hoặc Markdown

  @Prop({})
  coverImage: string;

  @Prop({ default: true })
  isVisible: boolean;

  @Prop({ type: String, enum: PostType, default: PostType.POST })
  type: PostType;

  @Prop({ default: 1, min: 0 })
  priority: number;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  createdBy: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', default: null })
  updatedBy: Types.ObjectId;
}

export const PostSchema = SchemaFactory.createForClass(Post);
