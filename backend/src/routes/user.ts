import { Hono } from "hono";
// to deploy to an edge runtime like Cloudflare Workers, you need to use the edge version of Prisma
import { PrismaClient } from "@prisma/client/edge";
import { sign } from "hono/jwt";
import prismaMiddleware from "../middleware/prismaMiddleware";
import { SigninInput, signupInput } from "@anushka_kohli/muse-common-app";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    prisma: object;
  };
}>();

userRouter.use("/*", prismaMiddleware);

userRouter.post("/signup", async (c) => {
  const prisma = c.get("prisma") as PrismaClient;

  const body = await c.req.json();

  // Hash the password
  const hashedPassword = await crypto.subtle.digest(
    {
      name: "SHA-256",
    },
    new TextEncoder().encode(body.password)
  );
  const hashedPasswordString = Array.from(new Uint8Array(hashedPassword))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");

  const { success } = signupInput.safeParse(body);

  if (!success) {
    c.status(400);
    return c.json({ error: "Signup error: Invalid input" });
  }

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
        password: hashedPasswordString,
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

userRouter.post("/signin", async (c) => {
  const prisma = c.get("prisma") as PrismaClient;

  const body = await c.req.json();

  const hashedPassword = await crypto.subtle.digest(
    {
      name: "SHA-256",
    },
    new TextEncoder().encode(body.password)
  );
  const hashedPasswordString = Array.from(new Uint8Array(hashedPassword))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");

  const { success } = SigninInput.safeParse(body);
  if (!success) {
    c.status(400);
    return c.json({ error: "Signin Error: Invalid input" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
        password: hashedPasswordString,
      },
    });

    if (user?.password !== hashedPasswordString) {
      c.status(403);
      return c.json({
        message: "Invalid email or password",
      });
    }

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
