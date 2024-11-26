import { trpc } from "../trpc.js";
import { userRouter } from "./user-router.js";

const appRouter = trpc.router({
  todo: userRouter,
});

export type AppRouter = typeof appRouter;
export default appRouter;
