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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LabSchema = exports.Lab = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const lab_enum_1 = require("../types/lab.enum");
let Lab = class Lab {
    name;
    description;
    location;
    status;
    totalSeats;
    createdBy;
    updatedBy;
};
exports.Lab = Lab;
__decorate([
    (0, mongoose_1.Prop)({ required: true, unique: true }),
    __metadata("design:type", String)
], Lab.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Lab.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Lab.prototype, "location", void 0);
__decorate([
    (0, mongoose_1.Prop)({ enum: lab_enum_1.LabStatus, default: lab_enum_1.LabStatus.ACTIVE }),
    __metadata("design:type", String)
], Lab.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Lab.prototype, "totalSeats", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User', default: null }),
    __metadata("design:type", String)
], Lab.prototype, "createdBy", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User', default: null }),
    __metadata("design:type", String)
], Lab.prototype, "updatedBy", void 0);
exports.Lab = Lab = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Lab);
exports.LabSchema = mongoose_1.SchemaFactory.createForClass(Lab);
exports.LabSchema.virtual('seats', {
    ref: 'Seat',
    localField: '_id',
    foreignField: 'lab',
});
exports.LabSchema.set('toJSON', { virtuals: true });
exports.LabSchema.set('toObject', { virtuals: true });
//# sourceMappingURL=lab.schema.js.map