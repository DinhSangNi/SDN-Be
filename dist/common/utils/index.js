"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toCamelCase = toCamelCase;
function toCamelCase(fullName) {
    return fullName
        .toLowerCase()
        .split(' ')
        .filter(Boolean)
        .map((word, index) => index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1))
        .join('');
}
//# sourceMappingURL=index.js.map