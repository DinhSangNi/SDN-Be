import { Document, Types } from 'mongoose';
import { PostType } from '../types/post.enum';
export type PostDocument = Post & Document;
export declare class Post {
    title: string;
    content: string;
    coverImage: string;
    isVisible: boolean;
    type: PostType;
    priority: number;
    createdBy: Types.ObjectId;
    updatedBy: Types.ObjectId;
}
export declare const PostSchema: import("mongoose").Schema<Post, import("mongoose").Model<Post, any, any, any, Document<unknown, any, Post, any> & Post & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Post, Document<unknown, {}, import("mongoose").FlatRecord<Post>, {}> & import("mongoose").FlatRecord<Post> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
