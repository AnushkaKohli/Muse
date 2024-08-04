import { Hono } from "hono";
import authMiddleware from "../middleware/authMiddleware";
import prismaMiddleware from "../middleware/prismaMiddleware";
import {
  createBlogInput,
  updateBlogInput,
} from "@anushka_kohli/muse-common-app";

type prismaObject = {
  blogPost: {
    create: (data: object) => object;
    update: (data: object) => object;
    findUnique: (data: object) => object;
    findMany: () => [object];
  };
  user: object;
};

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

blogRouter.post("/", async (c) => {
  try {
    const userId = c.get("userId");
    const prisma = c.get("prisma") as prismaObject;
    const { body } = await c.req.json();
    const { success } = createBlogInput.safeParse(body);
    if (!success) {
      c.status(400);
      return c.json({ error: "Create Blog Error: Invalid input" });
    }
    const post = await prisma.blogPost.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: userId,
      },
    });
    return c.json(post);
  } catch (error) {
    console.log("Error in blogRouter.post", error);
    c.status(403);
    return c.json({ error: "Internal Server Error" });
  }
});

blogRouter.put("/", async (c) => {
  try {
    const userId = c.get("userId");
    const prisma = c.get("prisma") as prismaObject;
    const { id, title, content } = await c.req.json();
    const { success } = updateBlogInput.safeParse({ title, content });
    if (!success) {
      return c.json({ error: "Update Blog Error: Invalid input" });
    }
    if (!id) {
      return c.json({ error: "id is required" });
    }
    const post = await prisma.blogPost.update({
      where: { id, authorId: userId },
      data: {
        title,
        content,
      },
    });
    return c.json(post);
  } catch (error) {
    console.log("Error in blogRouter.put", error);
    c.status(403);
    return c.json({ error: "Internal Server Error" });
  }
});

blogRouter.get("/all", async (c) => {
  try {
    const prisma = c.get("prisma") as prismaObject;
    const blogPosts = await prisma.blogPost.findMany();
    return c.json({ blogPosts });
  } catch (error) {
    console.log("Error in blogRouter.get", error);
    c.status(403);
    return c.json({ error: "Internal Server Error" });
  }
});

blogRouter.get("/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const prisma = c.get("prisma") as prismaObject;
    const post = await prisma.blogPost.findUnique({
      where: { id },
    });
    return c.json(post);
  } catch (error) {
    console.log("Error in blogRouter.get", error);
    c.status(403);
    return c.json({ error: "Internal Server Error" });
  }
});
