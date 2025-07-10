import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument } from './schema/post.schema';
import { Model, Types } from 'mongoose';
import { GetPostsFilterDto, SortType } from './dto/get-posts-filter.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { UpdatePostVisibilityDto } from './dto/update-visible.dto';
import { UpdatePostPriorityDto } from './dto/update-priority.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name) private readonly postModel: Model<Post>,
  ) {}

  async getAll(filterDto: GetPostsFilterDto): Promise<{
    posts: PostDocument[];
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
  }> {
    const { isVisible, type, priority, sort, page = 1, limit = 10 } = filterDto;

    const query: any = {};
    if (isVisible !== undefined) query.isVisible = isVisible;
    if (type !== undefined) query.type = type;
    if (priority !== undefined) query.priority = priority;

    const skip = (page - 1) * limit;

    const totalItems = await this.postModel.countDocuments(query);

    const posts = await this.postModel
      .find(query)
      .sort({
        priority: -1,
        createdAt: sort !== undefined && sort === SortType.LATEST ? -1 : 1,
      })
      .skip(skip)
      .limit(limit)
      .populate('createdBy');

    const totalPages = Math.ceil(totalItems / limit);

    return {
      posts,
      page,
      limit,
      totalItems,
      totalPages,
    };
  }

  async getById(id: string): Promise<Post> {
    const post = await this.postModel.findById(id).populate('createdBy');
    if (!post) throw new NotFoundException(`Post with id ${id} not found !`);

    return post.toObject();
  }

  async create(createPostDto: CreatePostDto, userId: string): Promise<Post> {
    const createdPost = new this.postModel({
      ...createPostDto,
      priority: createPostDto.type === 'post' ? 1 : 0,
      createdBy: new Types.ObjectId(userId),
    });
    return await createdPost.save();
  }

  async update(
    id: string,
    updatePostDto: UpdatePostDto,
    userId: string,
  ): Promise<Post> {
    const post = await this.postModel.findById(id);

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    Object.assign(post, updatePostDto);
    post.updatedBy = new Types.ObjectId(userId);
    return (await post.save()).toObject();
  }

  async delete(id: string): Promise<Post> {
    const post = await this.postModel.findById(id);

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    await post.deleteOne();

    return post.toObject();
  }

  async changeVisibility(
    id: string,
    dto: UpdatePostVisibilityDto,
  ): Promise<Post> {
    const post = await this.postModel.findById(id);

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    post.isVisible = dto.isVisible;
    return (await post.save()).toObject();
  }

  async changePriority(id: string, dto: UpdatePostPriorityDto): Promise<Post> {
    const post = await this.postModel.findById(id);

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    post.priority = dto.priority;
    return (await post.save()).toObject();
  }
}
