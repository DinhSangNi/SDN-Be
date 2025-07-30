import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { GetPostsFilterDto } from './dto/get-posts-filter.dto';
import { Response } from 'express';
import { UpdatePostDto } from './dto/update-post.dto';
import { UpdatePostVisibilityDto } from './dto/update-visible.dto';
import { UpdatePostPriorityDto } from './dto/update-priority.dto';
export declare class PostController {
    private readonly postService;
    constructor(postService: PostService);
    createPost(createPostDto: CreatePostDto, req: {
        user: {
            userId: string;
        };
    }, res: Response): Promise<Response<any, Record<string, any>>>;
    getAllPosts(filterDto: GetPostsFilterDto, res: Response): Promise<Response<any, Record<string, any>>>;
    getPostById(id: string, res: Response): Promise<Response<any, Record<string, any>>>;
    update(id: string, updatePostDto: UpdatePostDto, req: {
        user: {
            userId: string;
        };
    }, res: Response): Promise<Response<any, Record<string, any>>>;
    deletePost(id: string, res: Response): Promise<Response<any, Record<string, any>>>;
    changeVisibility(id: string, dto: UpdatePostVisibilityDto, res: Response): Promise<Response<any, Record<string, any>>>;
    updatePriority(id: string, dto: UpdatePostPriorityDto, res: Response): Promise<Response<any, Record<string, any>>>;
}
