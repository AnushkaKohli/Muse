// to deploy to an edge runtime like Cloudflare Workers, you need to use the edge version of Prisma
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

const prismaMiddleware = async (c: any, next: () => void) => {
  // Creating a new instance of the PrismaClient. Additionally, it is extending the PrismaClient instance with the `withAccelerate` extension, which is used to optimize and accelerate database queries and operations.
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  c.set("prisma", prisma);
  await next();
};

export default prismaMiddleware;
