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
