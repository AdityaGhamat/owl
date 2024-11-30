import { Hono } from "hono";

const homeRouter = new Hono().get((c) =>
  c.json({
    name: "owl",
  })
);

export { homeRouter };
