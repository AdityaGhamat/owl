import { IAuth } from "@repo/types/src/database";
export function userCover(user: IAuth) {
  const { name, email, role, twoFactorEnabled, isDeleted } = user;
  const response = { name, email, role, twoFactorEnabled, isDeleted };
  return response;
}
