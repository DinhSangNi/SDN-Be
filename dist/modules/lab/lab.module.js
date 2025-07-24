"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LabModule = void 0;
const common_1 = require("@nestjs/common");
const lab_service_1 = require("./lab.service");
const lab_controller_1 = require("./lab.controller");
const mongoose_1 = require("@nestjs/mongoose");
const lab_schema_1 = require("./schema/lab.schema");
const seat_module_1 = require("../seat/seat.module");
const booking_module_1 = require("../booking/booking.module");
let LabModule = class LabModule {
};
exports.LabModule = LabModule;
exports.LabModule = LabModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                {
                    name: lab_schema_1.Lab.name,
                    schema: lab_schema_1.LabSchema,
                },
            ]),
            (0, common_1.forwardRef)(() => seat_module_1.SeatModule),
            (0, common_1.forwardRef)(() => booking_module_1.BookingModule),
        ],
        controllers: [lab_controller_1.LabController],
        providers: [lab_service_1.LabService],
        exports: [lab_service_1.LabService],
    })
], LabModule);
//# sourceMappingURL=lab.module.js.map