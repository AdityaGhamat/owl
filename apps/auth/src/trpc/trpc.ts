import { initTRPC } from "@trpc/server";
export const trpc = initTRPC.create();
export const publicProcedure = trpc.procedure;
export const router = trpc.router;
