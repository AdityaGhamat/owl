"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userCover = void 0;
function userCover(user) {
    const { _id, name, email, role, twoFactorEnabled, isDeleted } = user;
    const response = { id: _id, name, email, role, twoFactorEnabled, isDeleted };
    return response;
}
exports.userCover = userCover;
