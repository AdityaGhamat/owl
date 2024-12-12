"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userCover = void 0;
function userCover(user) {
    const { name, email, role, twoFactorEnabled, isDeleted } = user;
    const response = { name, email, role, twoFactorEnabled, isDeleted };
    return response;
}
exports.userCover = userCover;
