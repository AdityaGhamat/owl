import IAuth from "../types/database/index.js";

function userCover(user: IAuth) {
  const { name, email, role, twoFactorEnabled, isDeleted } = user;
  const response = { name, email, role, twoFactorEnabled, isDeleted };
  return response;
}
export { userCover };
