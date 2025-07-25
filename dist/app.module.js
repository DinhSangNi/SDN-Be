"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const user_module_1 = require("./modules/user/user.module");
const cloudinary_module_1 = require("./modules/cloudinary/cloudinary.module");
const auth_module_1 = require("./modules/auth/auth.module");
const post_module_1 = require("./modules/post/post.module");
const media_module_1 = require("./modules/media/media.module");
const schedule_1 = require("@nestjs/schedule");
const lab_module_1 = require("./modules/lab/lab.module");
const booking_module_1 = require("./modules/booking/booking.module");
const gemini_module_1 = require("./modules/gemini/gemini.module");
const seat_module_1 = require("./modules/seat/seat.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            mongoose_1.MongooseModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => ({
                    uri: configService.get('MONGO_URI'),
                }),
                inject: [config_1.ConfigService],
            }),
            schedule_1.ScheduleModule.forRoot(),
            cloudinary_module_1.CloudinaryModule,
            user_module_1.UserModule,
            post_module_1.PostModule,
            auth_module_1.AuthModule,
            media_module_1.MediaModule,
            lab_module_1.LabModule,
            booking_module_1.BookingModule,
            gemini_module_1.GeminiModule,
            seat_module_1.SeatModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map