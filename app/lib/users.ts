import "server-only";

import { randomUUID } from "node:crypto";
import { GetCommand, PutCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";

import { db, EMAIL_INDEX, normalizeEmail, TABLES } from "./dynamo";

export type User = {
  userId: string;
  email: string;
  name: string;
  passwordHash: string;
  createdAt: string;
};

/** Everything safe to hand to a client component. */
export type PublicUser = Pick<User, "userId" | "email" | "name">;

export function toPublicUser(user: User): PublicUser {
  return { userId: user.userId, email: user.email, name: user.name };
}

export async function getUserById(userId: string): Promise<User | null> {
  const result = await db.send(
    new GetCommand({ TableName: TABLES.users, Key: { userId } })
  );
  return (result.Item as User | undefined) ?? null;
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const result = await db.send(
    new QueryCommand({
      TableName: TABLES.users,
      IndexName: EMAIL_INDEX,
      KeyConditionExpression: "email = :email",
      ExpressionAttributeValues: { ":email": normalizeEmail(email) },
      Limit: 1,
    })
  );
  return (result.Items?.[0] as User | undefined) ?? null;
}

export async function createUser(input: {
  email: string;
  name: string;
  passwordHash: string;
}): Promise<User> {
  const user: User = {
    userId: randomUUID(),
    email: normalizeEmail(input.email),
    name: input.name.trim(),
    passwordHash: input.passwordHash,
    createdAt: new Date().toISOString(),
  };

  await db.send(
    new PutCommand({
      TableName: TABLES.users,
      Item: user,
      // Guards against a duplicate write racing in on the same userId.
      ConditionExpression: "attribute_not_exists(userId)",
    })
  );

  return user;
}
