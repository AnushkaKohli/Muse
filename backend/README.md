# Get started

```bash
npm install
npm run dev
```

```bash
npm run deploy
```

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

#### Example

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

To learn more: [Hono: JWT](https://hono.dev/docs/helpers/jwt)
