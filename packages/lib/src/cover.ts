import { IAuth } from "@repo/types/src/database";
export function userCover(user: IAuth) {
  const { _id, name, email, role, twoFactorEnabled, isDeleted } = user;
  const response = { id: _id, name, email, role, twoFactorEnabled, isDeleted };
  return response;
}
