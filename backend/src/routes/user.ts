import { Hono } from "hono";
// to deploy to an edge runtime like Cloudflare Workers, you need to use the edge version of Prisma
import { PrismaClient } from "@prisma/client/edge";
import { sign } from "hono/jwt";

import prismaMiddleware from "../middleware/prismaMiddleware";
import {
  signinInput,
  signupInput,
  updateUserDetailsInput,
} from "@anushka_kohli/muse-common-app";
import authMiddleware from "../middleware/authMiddleware";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
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

  const { success } = signinInput.safeParse(body);
  if (!success) {
    c.status(400);
    return c.json({ error: "Signin Error: Invalid input" });
  }

  const hashedPassword = await crypto.subtle.digest(
    {
      name: "SHA-256",
    },
    new TextEncoder().encode(body.password)
  );
  const hashedPasswordString = Array.from(new Uint8Array(hashedPassword))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");

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
    return c.json({
      message: "Error during signin",
      error: (error as Error).message,
    });
  }
});

userRouter.use("/update", authMiddleware);
userRouter.put("/update", async (c) => {
  const prisma = c.get("prisma") as PrismaClient;
  const body = await c.req.json();

  const { success } = updateUserDetailsInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      message: "Update User Error: Invalid Input",
    });
  }

  const hashedPassword = await crypto.subtle.digest(
    {
      name: "SHA-256",
    },
    new TextEncoder().encode(body.password)
  );

  const hashedPasswordString = Array.from(new Uint8Array(hashedPassword))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");

  body.password = hashedPasswordString;

  try {
    const res = await prisma.user.update({
      where: {
        id: c.get("userId"),
      },
      data: body,
    });

    return c.json({
      message: "Details Updated",
    });
  } catch (error) {
    const userId = c.get("userId");
    console.log("UserId: ", userId);
    c.status(403);
    return c.json({
      message: "Internal Server Error",
      error: (error as Error).message,
    });
  }
});

userRouter.get("/:id", async (c) => {
  const id = c.req.param("id");
  const prisma = c.get("prisma") as PrismaClient;
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        posts: {
          where: {
            published: true,
          },
        },
      },
    });

    console.log(user);

    return c.json({
      user,
    });
  } catch (error) {
    console.log("Error: " + error);

    c.status(403);
    return c.json({
      message: "Internal Server Error",
    });
  }
});
