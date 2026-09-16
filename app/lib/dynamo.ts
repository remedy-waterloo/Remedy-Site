import "server-only";

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const region = process.env.AWS_REGION ?? "us-east-1";

// Credentials are picked up from the standard AWS provider chain (env vars,
// shared config, or an IAM role in production). Nothing to wire up here.
// Set DYNAMODB_ENDPOINT to point at DynamoDB Local during development.
const client = new DynamoDBClient({
  region,
  ...(process.env.DYNAMODB_ENDPOINT
    ? { endpoint: process.env.DYNAMODB_ENDPOINT }
    : {}),
});

export const db = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

export const TABLES = {
  users: process.env.USERS_TABLE ?? "remedy-users",
  sessions: process.env.SESSIONS_TABLE ?? "remedy-sessions",
  invites: process.env.INVITES_TABLE ?? "remedy-invites",
};

export const EMAIL_INDEX = "email-index";

/** Emails are stored and compared lowercased so lookups are stable. */
export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}
