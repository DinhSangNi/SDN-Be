"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createContent = createContent;
function createContent(text, ...images) {
    const imageParts = images.map((image) => {
        return {
            inlineData: {
                mimeType: image.mimetype,
                data: image.buffer.toString('base64'),
            },
        };
    });
    return [
        {
            role: 'user',
            parts: [
                ...imageParts,
                {
                    text,
                },
            ],
        },
    ];
}
//# sourceMappingURL=content.helper.js.map