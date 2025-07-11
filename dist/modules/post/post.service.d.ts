import { Post, PostDocument } from './schema/post.schema';
import { Model } from 'mongoose';
import { GetPostsFilterDto } from './dto/get-posts-filter.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { UpdatePostVisibilityDto } from './dto/update-visible.dto';
import { UpdatePostPriorityDto } from './dto/update-priority.dto';
export declare class PostService {
    private readonly postModel;
    constructor(postModel: Model<Post>);
    getAll(filterDto: GetPostsFilterDto): Promise<{
        posts: PostDocument[];
        page: number;
        limit: number;
        totalItems: number;
        totalPages: number;
    }>;
    getById(id: string): Promise<Post>;
    create(createPostDto: CreatePostDto, userId: string): Promise<Post>;
    update(id: string, updatePostDto: UpdatePostDto, userId: string): Promise<Post>;
    delete(id: string): Promise<Post>;
    changeVisibility(id: string, dto: UpdatePostVisibilityDto): Promise<Post>;
    changePriority(id: string, dto: UpdatePostPriorityDto): Promise<Post>;
}
