import { userId, userSchema, editUserSchemaTrpc } from "@repo/validations";
import { publicProcedure, trpc } from "../trpc.js";
import userServices from "../../services/user-services.js";

const userRouter = trpc.router({
  createUser: publicProcedure.input(userSchema).mutation(async ({ input }) => {
    const user = await userServices.createUser(input);
    return user;
  }),
  getUser: publicProcedure.input(userId).query(async ({ input }) => {
    const user = await userServices.getUser(input);
    return user;
  }),
  // editUser: publicProcedure
  //   .input(editUserSchemaTrpc)
  //   .mutation(async ({ input }) => {
  //     const { userId, data } = input;
  //     const user = await userServices.editUser(userId, data);
  //     return user;
  //   }),
});
export { userRouter };
type UserRouter = typeof userRouter;
export default UserRouter;
