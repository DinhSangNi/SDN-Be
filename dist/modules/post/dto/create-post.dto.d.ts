export declare enum PostType {
    POST = "post",
    ANNOUNCEMENT = "announcement"
}
export declare class CreatePostDto {
    title: string;
    content: string;
    coverImage?: string;
    isVisible?: boolean;
    type: PostType;
    priority?: number;
    tags?: string[];
}
