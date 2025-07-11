import { Document } from 'mongoose';
export type UserDocument = User & Document;
export declare enum UserRole {
    STUDENT = "student",
    ADMIN = "admin"
}
export declare class User {
    email: string;
    password: string;
    role: UserRole;
    fullName?: string;
    avatar?: string;
    isActive: boolean;
}
export declare const UserSchema: import("mongoose").Schema<User, import("mongoose").Model<User, any, any, any, Document<unknown, any, User, any> & User & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, User, Document<unknown, {}, import("mongoose").FlatRecord<User>, {}> & import("mongoose").FlatRecord<User> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
