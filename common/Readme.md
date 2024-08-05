# Common Folder

This folder contains shared validation schemas and types used by both the backend and frontend of the Muse blogging website.

## Overview

The common folder includes Zod schemas for input validation and TypeScript types inferred from these schemas. These are essential for ensuring data integrity and consistency across the application.

## File Structure

```plaintext
src/
└── index.ts
```

## Schemas and Types

### Signup Input

The `signupInput` schema validates the data for user signup.

### Signin Input

The `signinInput` schema validates the data for user signin.

### UpdateUserDetails Input

The `updateUserDetailsInput` schema validates the data for updating user details.

### Create Blog Input

The `createBlogInput` schema validates the data for creating a new blog post.

### Update Blog Input

The `updateBlogInput` schema validates the data for updating an existing blog post.

## Usage

These schemas and types are used across both backend and frontend to ensure that the data being handled conforms to the expected structure. This helps prevent errors and maintain consistency.

### Generate Output

To generate the output, run:

```bash
tsc -b
```

### Publishing to npm

To publish the package to npm, use:

```bash
npm publish --access public
```

### Accessing in Backend

To use this package in the backend, follow these steps:

1. Navigate to the backend folder:

    ```bash
    cd backend
    ```

2. Install the package you published to npm:

    ```bash
    npm install your_package_name
    ```

3. Explore the package:

    ```bash
    cd node_modules/your_package_name
    ```

4. Update the routes to include Zod validation. Example usage:

    ```typescript
    import { signinInput, signupInput, createPostInput, updatePostInput } from "@muse/common-app";

    userRouter.post("/signup", async (c) => {
        const prisma = c.get("prisma") as PrismaClient;
        const body = await c.req.json();
        const { success } = signupInput.safeParse(body);
        if (!success) {
            c.status(400);
            return c.json({ error: "invalid input" });
        }
    });
    ```

## Contributing

Contributions are welcome! Please ensure that any new schemas or types added are well-documented and tested.

<!-- ## License

This project is licensed under the MIT License. -->