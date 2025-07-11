import { Document } from 'mongoose';
export type MediaDocument = Media & Document;
export declare class Media {
    url: string;
    publicId: string;
    type: string;
    name?: string;
    size?: number;
    uploadedBy?: string;
    isTemporary: boolean;
    relatedTo?: string;
    description?: string;
}
export declare const MediaSchema: import("mongoose").Schema<Media, import("mongoose").Model<Media, any, any, any, Document<unknown, any, Media, any> & Media & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Media, Document<unknown, {}, import("mongoose").FlatRecord<Media>, {}> & import("mongoose").FlatRecord<Media> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
