import { Hono } from "hono";

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
  return c.text("Signup route");
});

app.post("/api/v1/user/signin", (c) => {
  return c.text("Signin route");
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
