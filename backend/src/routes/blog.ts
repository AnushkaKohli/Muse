import { Hono } from "hono";
import authMiddleware from "../middleware/authMiddleware";
import prismaMiddleware from "../middleware/prismaMiddleware";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
    prisma: object;
  };
}>();

blogRouter.use("/*", authMiddleware, prismaMiddleware);

blogRouter.post("/", (c) => {
  console.log("c.userId", c.get("userId"));
  return c.text(`Blog route: post ${c.get("userId")}`);
});

blogRouter.put("/", (c) => {
  return c.text("Blog route: put");
});

blogRouter.get("/:id", (c) => {
  const id = c.req.param("id");
  console.log("id", id);
  return c.text("Blog route: get");
});

blogRouter.get("/bulk", (c) => {
  return c.text("Blog route: put");
});
