import { jwtVerify, SignJWT } from "jose";

/**
 * Token signing/verification only — deliberately free of any DynamoDB or
 * `next/headers` imports so `proxy.ts` can use it without pulling the AWS
 * SDK into the proxy bundle.
 */

export const SESSION_COOKIE = "remedy_session";

export type SessionClaims = { sessionId: string; userId: string };

function getSecret(): Uint8Array {
  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    throw new Error(
      "SESSION_SECRET is not set. Generate one with: openssl rand -base64 32"
    );
  }
  return new TextEncoder().encode(secret);
}

export async function signSessionToken(payload: {
  sessionId: string;
  userId: string;
  absoluteExpiresAt: number;
}): Promise<string> {
  return new SignJWT({ sessionId: payload.sessionId, userId: payload.userId })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(Math.floor(payload.absoluteExpiresAt / 1000))
    .sign(getSecret());
}

/**
 * Verifies signature and expiry. Does NOT confirm the session still exists
 * server-side — that's `verifySession()` in session.ts.
 */
export async function verifySessionToken(
  token: string | undefined
): Promise<SessionClaims | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, getSecret(), {
      algorithms: ["HS256"],
    });
    const { sessionId, userId } = payload;
    if (typeof sessionId !== "string" || typeof userId !== "string") return null;
    return { sessionId, userId };
  } catch {
    return null;
  }
}
