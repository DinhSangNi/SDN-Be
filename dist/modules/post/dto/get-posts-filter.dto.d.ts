import { PostType } from './create-post.dto';
export declare enum SortType {
    LATEST = "latest",
    OLDEST = "oldest"
}
export declare class GetPostsFilterDto {
    isVisible?: boolean;
    type?: PostType;
    priority?: number;
    page?: number;
    limit?: number;
    sort?: SortType;
}
