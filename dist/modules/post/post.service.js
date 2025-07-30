"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const post_schema_1 = require("./schema/post.schema");
const mongoose_2 = require("mongoose");
const enums_1 = require("../../common/types/enums");
let PostService = class PostService {
    postModel;
    constructor(postModel) {
        this.postModel = postModel;
    }
    async getAll(filterDto) {
        const { isVisible, type, priority, sort, page = 1, limit = 10, keyword, } = filterDto;
        const query = {};
        if (isVisible !== undefined)
            query.isVisible = isVisible;
        if (type !== undefined)
            query.type = type;
        if (priority !== undefined)
            query.priority = priority;
        if (keyword) {
            query.$or = [
                { title: { $regex: keyword, $options: 'i' } },
                { content: { $regex: keyword, $options: 'i' } },
            ];
        }
        const skip = (page - 1) * limit;
        const totalItems = await this.postModel.countDocuments(query);
        const totalPages = Math.ceil(totalItems / limit);
        const posts = await this.postModel
            .find(query)
            .sort({
            priority: -1,
            createdAt: sort === enums_1.SortType.LATEST ? -1 : 1,
        })
            .skip(skip)
            .limit(limit)
            .populate('createdBy');
        return {
            posts,
            page,
            limit,
            totalItems,
            totalPages,
        };
    }
    async getById(id) {
        const post = await this.postModel.findById(id).populate('createdBy').lean();
        if (!post)
            throw new common_1.NotFoundException(`Post with id ${id} not found !`);
        return post;
    }
    async create(createPostDto, userId) {
        const createdPost = new this.postModel({
            ...createPostDto,
            priority: createPostDto.type === 'post' ? 1 : 2,
            createdBy: new mongoose_2.Types.ObjectId(userId),
        });
        return await createdPost.save();
    }
    async update(id, updatePostDto, userId) {
        const post = await this.postModel.findById(id);
        if (!post) {
            throw new common_1.NotFoundException('Post not found');
        }
        Object.assign(post, updatePostDto);
        post.updatedBy = new mongoose_2.Types.ObjectId(userId);
        return (await post.save()).toObject();
    }
    async delete(id) {
        const post = await this.postModel.findById(id);
        if (!post) {
            throw new common_1.NotFoundException('Post not found');
        }
        await post.deleteOne();
        return post.toObject();
    }
    async changeVisibility(id, dto) {
        const post = await this.postModel.findById(id);
        if (!post) {
            throw new common_1.NotFoundException('Post not found');
        }
        post.isVisible = dto.isVisible;
        return (await post.save()).toObject();
    }
    async changePriority(id, dto) {
        const post = await this.postModel.findById(id);
        if (!post) {
            throw new common_1.NotFoundException('Post not found');
        }
        post.priority = dto.priority;
        return (await post.save()).toObject();
    }
};
exports.PostService = PostService;
exports.PostService = PostService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(post_schema_1.Post.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], PostService);
//# sourceMappingURL=post.service.js.map