"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudinaryProvider = void 0;
const cloudinary_1 = require("cloudinary");
const config_1 = require("@nestjs/config");
exports.CloudinaryProvider = {
    provide: 'CLOUDINARY',
    inject: [config_1.ConfigService],
    useFactory: (configService) => {
        cloudinary_1.v2.config({
            cloud_name: configService.get('CLOUDINARY_CLOUD_NAME'),
            api_key: configService.get('CLOUDINARY_API_KEY'),
            api_secret: configService.get('CLOUDINARY_API_SECRET'),
        });
        return cloudinary_1.v2;
    },
};
//# sourceMappingURL=cloudinary.provider.js.map