import "server-only";

import { randomUUID } from "node:crypto";
import { cookies } from "next/headers";
import {
  DeleteCommand,
  GetCommand,
  PutCommand,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb";

import { db, TABLES } from "./dynamo";
import {
  SESSION_COOKIE,
  signSessionToken,
  verifySessionToken,
  type SessionClaims,
} from "./session-token";

export { SESSION_COOKIE, verifySessionToken };

/** Logged out after 30 minutes of inactivity. */
const IDLE_TIMEOUT_MS = 30 * 60 * 1000;
/** Hard ceiling regardless of activity. */
const ABSOLUTE_TIMEOUT_MS = 7 * 24 * 60 * 60 * 1000;
/** Only push the idle window forward if this much has elapsed, to bound writes. */
const SLIDE_THRESHOLD_MS = 5 * 60 * 1000;

type SessionRecord = {
  sessionId: string;
  userId: string;
  idleExpiresAt: number;
  absoluteExpiresAt: number;
  createdAt: number;
};

/** Undefined in dev so the cookie works on localhost; `.myremedy.app` in prod. */
function cookieDomain(): string | undefined {
  return process.env.COOKIE_DOMAIN || undefined;
}

function baseCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    domain: cookieDomain(),
  };
}

export async function createSession(
  userId: string,
  rememberMe: boolean
): Promise<void> {
  const now = Date.now();
  const record: SessionRecord = {
    sessionId: randomUUID(),
    userId,
    idleExpiresAt: now + IDLE_TIMEOUT_MS,
    absoluteExpiresAt: now + ABSOLUTE_TIMEOUT_MS,
    createdAt: now,
  };

  await db.send(
    new PutCommand({
      TableName: TABLES.sessions,
      Item: {
        ...record,
        // DynamoDB TTL expects epoch *seconds*. This cleans up expired
        // sessions automatically, at no cost.
        ttl: Math.floor(record.absoluteExpiresAt / 1000),
      },
    })
  );

  const token = await signSessionToken(record);
  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE, token, {
    ...baseCookieOptions(),
    // Persistent cookie only when "remember me" is checked; otherwise it dies
    // with the browser session. The idle timeout applies either way.
    ...(rememberMe ? { maxAge: Math.floor(ABSOLUTE_TIMEOUT_MS / 1000) } : {}),
  });
}

/**
 * Authoritative session check: validates the token, then confirms the session
 * still exists and sits inside both the idle and absolute windows. Slides the
 * idle window forward on activity.
 */
export async function verifySession(): Promise<SessionClaims | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;

  const claims = await verifySessionToken(token);
  if (!claims) return null;

  const result = await db.send(
    new GetCommand({
      TableName: TABLES.sessions,
      Key: { sessionId: claims.sessionId },
    })
  );

  const record = result.Item as SessionRecord | undefined;
  if (!record) return null;

  const now = Date.now();
  if (now >= record.idleExpiresAt || now >= record.absoluteExpiresAt) {
    await destroySessionRecord(claims.sessionId);
    return null;
  }

  // Slide the idle window, but only once every SLIDE_THRESHOLD_MS so we aren't
  // writing to DynamoDB on every single request.
  const elapsedSinceSlide = IDLE_TIMEOUT_MS - (record.idleExpiresAt - now);
  if (elapsedSinceSlide >= SLIDE_THRESHOLD_MS) {
    const nextIdle = Math.min(now + IDLE_TIMEOUT_MS, record.absoluteExpiresAt);
    await db.send(
      new UpdateCommand({
        TableName: TABLES.sessions,
        Key: { sessionId: claims.sessionId },
        UpdateExpression: "SET idleExpiresAt = :idle",
        ExpressionAttributeValues: { ":idle": nextIdle },
      })
    );
  }

  return { sessionId: record.sessionId, userId: record.userId };
}

async function destroySessionRecord(sessionId: string): Promise<void> {
  await db.send(
    new DeleteCommand({ TableName: TABLES.sessions, Key: { sessionId } })
  );
}

/** Clears the session both server-side and in the browser. */
export async function deleteSession(): Promise<void> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  const claims = await verifySessionToken(token);

  if (claims) {
    await destroySessionRecord(claims.sessionId);
  }

  // Must match the domain/path the cookie was set with, or it won't clear.
  cookieStore.set(SESSION_COOKIE, "", { ...baseCookieOptions(), maxAge: 0 });
}
