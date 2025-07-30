import { PostType } from '../types/post.enum';
export declare class CreatePostDto {
    title: string;
    content: string;
    coverImage?: string;
    isVisible?: boolean;
    type: PostType;
    priority?: number;
}
