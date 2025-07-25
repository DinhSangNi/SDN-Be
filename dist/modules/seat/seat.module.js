"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeatModule = void 0;
const common_1 = require("@nestjs/common");
const seat_service_1 = require("./seat.service");
const seat_controller_1 = require("./seat.controller");
const lab_module_1 = require("../lab/lab.module");
const mongoose_1 = require("@nestjs/mongoose");
const seat_schema_1 = require("./schemas/seat.schema");
let SeatModule = class SeatModule {
};
exports.SeatModule = SeatModule;
exports.SeatModule = SeatModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                {
                    name: seat_schema_1.Seat.name,
                    schema: seat_schema_1.SeatSchema,
                },
            ]),
            (0, common_1.forwardRef)(() => lab_module_1.LabModule),
        ],
        controllers: [seat_controller_1.SeatController],
        providers: [seat_service_1.SeatService],
        exports: [seat_service_1.SeatService],
    })
], SeatModule);
//# sourceMappingURL=seat.module.js.map