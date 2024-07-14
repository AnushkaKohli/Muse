# Muse Blogging Website Backend

The Muse blogging website allows users to create and read blogs. 

## Project Overview

The Muse blogging website enables users to:

- Create and publish blog posts.
- Read blog posts published by other users.

## Installation

To install the necessary dependencies, run:

```bash
npm install
```

## Usage

To run the server, use:

```bash
npm run dev
```

Before running the server, ensure that the required environment variables are set up in the `wrangler.toml` file. You can use the `wrangler.example.toml` file as a reference.

To deploy the backend, use:

```bash
npm run deploy
```

## Environment Variables

The following environment variables are required:

- `DATABASE_URL`: The URL for your database.
- `JWT_SECRET`: The secret key used for JWT token generation.

These should be defined in the `wrangler.toml` file.

## JWT Authentication

The backend uses JWT for authentication. Tokens are generated using the `hono` sign method, which encodes a payload and signs it with the specified secret and algorithm. The JWT payload includes the user's ID, email, and name.

## API Routes

### User Routes

#### Signup

**Endpoint**: `POST /api/v1/user/signup`

**Description**: Creates a new user account.

**Request Body**:

```json
{
  "email": "user@example.com",
  "name": "John Doe",
  "password": "password123"
}
```

**Response**:

```json
{
  "jwt": "your_jwt_token"
}
```

#### Signin

**Endpoint**: `POST /api/v1/user/signin`

**Description**: Authenticates a user and returns a JWT token.

**Request Body**:

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response**:

```json
{
  "jwt": "your_jwt_token"
}
```

#### Future Routes

- **Update User**: A route to update the user's email or password.
- **Get User**: A route to get a user by their ID.

### Blog Routes

#### Create Blog Post

**Endpoint**: `POST /api/v1/blog/`

**Description**: Creates a new blog post.

**Request Body**:

```json
{
  "title": "Blog Title",
  "content": "Blog content here..."
}
```

**Response**:

```json
{
  "id": "blog_id",
  "title": "Blog Title",
  "content": "Blog content here...",
  "authorId": "user_id"
}
```

#### Update Blog Post

**Endpoint**: `PUT /api/v1/blog/`

**Description**: Updates an existing blog post.

**Request Body**:

```json
{
  "id": "blog_id",
  "title": "Updated Title",
  "content": "Updated content here..."
}
```

**Response**:

```json
{
  "id": "blog_id",
  "title": "Updated Title",
  "content": "Updated content here...",
  "authorId": "user_id"
}
```

#### Get All Blog Posts

**Endpoint**: `GET /api/v1/blog/all`

**Description**: Retrieves all blog posts.

**Response**:

```json
{
  "blogPosts": [
    {
      "id": "blog_id",
      "title": "Blog Title",
      "content": "Blog content here...",
      "authorId": "user_id"
    },
    ...
  ]
}
```

#### Get Blog Post by ID

**Endpoint**: `GET /api/v1/blog/:id`

**Description**: Retrieves a single blog post by its ID.

**Response**:

```json
{
  "id": "blog_id",
  "title": "Blog Title",
  "content": "Blog content here...",
  "authorId": "user_id"
}
```

#### Future Routes

- **Delete Blog Post**: A route to delete a blog post by ID.
- **Get User and Their Posts**: A route to get a user along with all the posts created by them.

## Middleware

### Authentication Middleware

The authentication middleware verifies the JWT token provided in the request headers.

### Prisma Middleware

The Prisma middleware sets up the Prisma client for database access.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

<!-- ## License -->

<!-- This project is licensed under the MIT License. -->

---

## Authentication in hono

### `sign()`

This function generates a JWT token by encoding a payload and signing it using the specified algorithm and secret.

```typescript
sign(
  payload: unknown,
  secret: string,
  alg?: 'HS256';

): Promise<string>;
```

#### Example 1

```typescript
import { sign } from 'hono/jwt'

const payload = {
  sub: 'user123',
  role: 'admin',
  exp: Math.floor(Date.now() / 1000) + 60 * 5, // Token expires in 5 minutes
}
const secret = 'mySecretKey'
const token = await sign(payload, secret)
```

### `verify()`

This function verifies a JWT token by decoding it and verifying the signature using the specified algorithm and secret.  It ensures the token hasn't been altered and checks validity only if you added Payload Validation.

```typescript
verify(
  token: string,
  secret: string,
  alg?: 'HS256';

): Promise<any>;
```

#### Example 2

```typescript
import { verify } from 'hono/jwt'

const tokenToVerify = 'token'
const secretKey = 'mySecretKey'

const decodedPayload = await verify(tokenToVerify, secretKey)
console.log(decodedPayload)
```

To learn more: [Hono: JWT](https://hono.dev/docs/helpers/jwt)

