import type { userCreation } from "../types/auth.js";

function userCover(user: userCreation) {
  const { name, email, role, twoFactorEnabled, isDeleted } = user;
  const response = { name, email, role, twoFactorEnabled, isDeleted };
  return response;
}
export { userCover };
