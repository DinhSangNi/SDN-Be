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
exports.LabController = void 0;
const common_1 = require("@nestjs/common");
const lab_service_1 = require("./lab.service");
const create_lab_dto_1 = require("./dto/create-lab.dto");
const api_response_dto_1 = require("../../common/dto/api-response.dto");
const passport_1 = require("@nestjs/passport");
const role_guard_1 = require("../../common/guards/role.guard");
const role_decorator_1 = require("../../common/decorators/role.decorator");
let LabController = class LabController {
    labService;
    constructor(labService) {
        this.labService = labService;
    }
    async createLab(createLabDto, res) {
        return res
            .status(common_1.HttpStatus.CREATED)
            .json(new api_response_dto_1.ApiResponse('Create new lab successfully', (await this.labService.create(createLabDto)).toObject()));
    }
    async getAllLabs(res) {
        return res
            .status(common_1.HttpStatus.CREATED)
            .json(new api_response_dto_1.ApiResponse('Create new lab successfully', await this.labService.findAll()));
    }
};
exports.LabController = LabController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), role_guard_1.RoleGuard),
    (0, role_decorator_1.Role)('admin'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_lab_dto_1.CreateLabDto, Object]),
    __metadata("design:returntype", Promise)
], LabController.prototype, "createLab", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LabController.prototype, "getAllLabs", null);
exports.LabController = LabController = __decorate([
    (0, common_1.Controller)('lab'),
    __metadata("design:paramtypes", [lab_service_1.LabService])
], LabController);
//# sourceMappingURL=lab.controller.js.map