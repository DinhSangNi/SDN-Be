import { PostType } from '../types/post.enum';
import { SortType } from 'src/common/types/enums';
export declare class GetPostsFilterDto {
    isVisible?: boolean;
    type?: PostType;
    priority?: number;
    page?: number;
    limit?: number;
    sort?: SortType;
    keyword?: string;
}
