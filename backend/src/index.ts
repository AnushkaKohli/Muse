import { Hono } from "hono";
// to deploy to an edge runtime like Cloudflare Workers, you need to use the edge version of Prisma
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, sign, verify } from "hono/jwt";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.post("/api/v1/user/signup", async (c) => {
  // Creating a new instance of the PrismaClient. Additionally, it is extending the PrismaClient instance with the `withAccelerate` extension, which is used to optimize and accelerate database queries and operations.
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  try {
    // Check if the user already exists
    const findUser = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    if (findUser) {
      c.status(411);
      return c.json({ message: "User already exists" });
    }
    console.log(findUser);
    // Create a new user
    const user = await prisma.user.create({
      data: {
        email: body.email,
        name: body.name,
        password: body.password,
      },
    });
    // Create a JWT token
    const jwt = await sign(
      {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      c.env?.JWT_SECRET
    );
    return c.json({ jwt });
  } catch (error) {
    c.status(403);
    console.log("Error signup: ", (error as Error).message);
    return c.json({ error: "Error during signup" });
  }
});

app.post("/api/v1/user/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    if (!user) {
      c.status(403);
      return c.json({ message: "User not found" });
    }

    const jwt = await sign(
      {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      c.env?.JWT_SECRET
    );

    return c.json({ jwt });
  } catch (error) {
    c.status(411);
    console.log("Error signin: ", (error as Error).message);
    return c.json({ error: "Error during signin" });
  }
});

app.post("/api/v1/blog", (c) => {
  return c.text("Blog route");
});

app.put("/api/v1/blog", (c) => {
  return c.text("Blog route: put");
});

app.get("/api/v1/blog/:id", (c) => {
  const id = c.req.param("id");
  console.log("id", id);
  return c.text("Blog route: get");
});

app.get("/api/v1/blog/bulk", (c) => {
  return c.text("Blog route: put");
});

export default app;
