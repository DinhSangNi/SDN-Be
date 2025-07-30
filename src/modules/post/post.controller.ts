import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import { AuthGuard } from '@nestjs/passport';
import { CreatePostDto } from './dto/create-post.dto';
import { GetPostsFilterDto } from './dto/get-posts-filter.dto';
import { Response } from 'express';
import { ApiResponse } from 'src/common/dto/api-response.dto';
import { PaginatedResponse } from 'src/common/dto/paginated-response.dto';
import { PostDocument } from './schema/post.schema';
import { UpdatePostDto } from './dto/update-post.dto';
import { UpdatePostVisibilityDto } from './dto/update-visible.dto';
import { UpdatePostPriorityDto } from './dto/update-priority.dto';
import { RoleGuard } from 'src/common/guards/role.guard';
import { Role } from 'src/common/decorators/role.decorator';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse as SwaggerApiResponse,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Post')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Role('admin')
  @ApiOperation({ summary: 'Create a new post' })
  @ApiBody({ type: CreatePostDto })
  async createPost(
    @Body() createPostDto: CreatePostDto,
    @Req() req: { user: { userId: string } },
    @Res() res: Response,
  ) {
    const { userId } = req.user;
    return res
      .status(HttpStatus.CREATED)
      .json(
        new ApiResponse(
          'Create post successfully',
          await this.postService.create(createPostDto, userId),
        ),
      );
  }

  @Get()
  @ApiOperation({ summary: 'Get all posts with filter' })
  async getAllPosts(
    @Query() filterDto: GetPostsFilterDto,
    @Res() res: Response,
  ) {
    const data = await this.postService.getAll(filterDto);
    return res
      .status(HttpStatus.OK)
      .json(
        new ApiResponse<PaginatedResponse<PostDocument>>(
          'List of posts',
          new PaginatedResponse(
            data.posts,
            data.page,
            data.limit,
            data.totalItems,
          ),
        ),
      );
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get post by ID' })
  async getPostById(@Param('id') id: string, @Res() res: Response) {
    return res
      .status(HttpStatus.OK)
      .json(
        new ApiResponse(
          'Get post by ID successfully',
          await this.postService.getById(id),
        ),
      );
  }

  @Put('/:id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Role('admin')
  @ApiOperation({ summary: 'Update post by ID' })
  @ApiBody({ type: UpdatePostDto })
  async update(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
    @Req() req: { user: { userId: string } },
    @Res() res: Response,
  ) {
    return res
      .status(HttpStatus.OK)
      .json(
        new ApiResponse(
          'Update post successfully',
          await this.postService.update(id, updatePostDto, req.user.userId),
        ),
      );
  }

  @Delete('/:id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Role('admin')
  @ApiOperation({ summary: 'Delete post by ID' })
  async deletePost(@Param('id') id: string, @Res() res: Response) {
    return res
      .status(HttpStatus.OK)
      .json(
        new ApiResponse(
          'Delete post successfully',
          await this.postService.delete(id),
        ),
      );
  }

  @Patch(':id/visibility')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Role('admin')
  @ApiOperation({ summary: 'Change visibility of a post' })
  @ApiBody({ type: UpdatePostVisibilityDto })
  async changeVisibility(
    @Param('id') id: string,
    @Body() dto: UpdatePostVisibilityDto,
    @Res() res: Response,
  ) {
    return res
      .status(HttpStatus.OK)
      .json(
        new ApiResponse(
          'Change visible of post successfully',
          await this.postService.changeVisibility(id, dto),
        ),
      );
  }

  @Patch(':id/priority')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Role('admin')
  @ApiOperation({ summary: 'Update priority of a post' })
  @ApiBody({ type: UpdatePostPriorityDto })
  async updatePriority(
    @Param('id') id: string,
    @Body() dto: UpdatePostPriorityDto,
    @Res() res: Response,
  ) {
    return res
      .status(HttpStatus.OK)
      .json(
        new ApiResponse(
          'Change priority of post successfully',
          await this.postService.changePriority(id, dto),
        ),
      );
  }
}
