import { verify } from "hono/jwt";

const authMiddleware = async (c: any, next: () => void) => {
  try {
    const jwt = c.req.header("Authorization");
    if (!jwt) {
      c.status(401);
      return c.json({ message: "Unauthorized" });
    }
    const payload = await verify(jwt, c.env?.JWT_SECRET);
    if (!payload) {
      c.status(401);
      return c.json({ message: "Unauthorized" });
    }
    c.set("userId", payload.id as string);

    await next();
  } catch (error: any) {
    if (error.name === "JwtTokenInvalid") {
      c.status(401);
      return c.json({ message: "Unauthorized" });
    }
    console.log("Error authMiddleware: ", error.message);
    c.status(400);
    return c.json({ message: "Bad request" + error.message });
  }
};

export default authMiddleware;
