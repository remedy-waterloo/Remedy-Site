#!/usr/bin/env node
/**
 * Fulfil a data deletion request (see "Your rights" in app/privacy/page.tsx).
 *
 * Removes everything we hold for one person: their user record, every session,
 * and their invite. Dry run by default — pass --yes to actually delete.
 *
 *   npm run delete-user -- someone@example.com          show what would go
 *   npm run delete-user -- someone@example.com --yes    delete it
 *
 * Like scripts/invite.mjs, this duplicates a little logic from app/lib on
 * purpose so it runs under plain node.
 *
 * If you add new tables that hold personal data (devices, dose records…),
 * add them here too, or deletion requests will silently leave data behind.
 */

import {
  BatchWriteCommand,
  DeleteCommand,
  DynamoDBDocumentClient,
  GetCommand,
  QueryCommand,
  ScanCommand,
} from "@aws-sdk/lib-dynamodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

const region = process.env.AWS_REGION ?? "us-east-1";
const USERS = process.env.USERS_TABLE ?? "remedy-users";
const SESSIONS = process.env.SESSIONS_TABLE ?? "remedy-sessions";
const INVITES = process.env.INVITES_TABLE ?? "remedy-invites";
const EMAIL_INDEX = "email-index";

const db = DynamoDBDocumentClient.from(
  new DynamoDBClient({
    region,
    ...(process.env.DYNAMODB_ENDPOINT
      ? { endpoint: process.env.DYNAMODB_ENDPOINT }
      : {}),
  })
);

const normalize = (email) => email.trim().toLowerCase();

async function findUser(email) {
  const result = await db.send(
    new QueryCommand({
      TableName: USERS,
      IndexName: EMAIL_INDEX,
      KeyConditionExpression: "email = :email",
      ExpressionAttributeValues: { ":email": email },
      Limit: 1,
    })
  );
  return result.Items?.[0] ?? null;
}

/** Sessions are keyed by sessionId with no userId index, so scan. Fine at pilot scale. */
async function findSessionIds(userId) {
  const ids = [];
  let startKey;
  do {
    const page = await db.send(
      new ScanCommand({
        TableName: SESSIONS,
        FilterExpression: "userId = :userId",
        ExpressionAttributeValues: { ":userId": userId },
        ProjectionExpression: "sessionId",
        ExclusiveStartKey: startKey,
      })
    );
    for (const item of page.Items ?? []) ids.push(item.sessionId);
    startKey = page.LastEvaluatedKey;
  } while (startKey);
  return ids;
}

async function deleteSessions(ids) {
  // BatchWrite takes at most 25 requests per call.
  for (let i = 0; i < ids.length; i += 25) {
    let requests = {
      [SESSIONS]: ids
        .slice(i, i + 25)
        .map((sessionId) => ({ DeleteRequest: { Key: { sessionId } } })),
    };
    while (requests && Object.keys(requests).length > 0) {
      const result = await db.send(
        new BatchWriteCommand({ RequestItems: requests })
      );
      requests = result.UnprocessedItems;
    }
  }
}

async function main() {
  const args = process.argv.slice(2);
  const email = args.find((arg) => !arg.startsWith("-"));
  const confirmed = args.includes("--yes");

  if (!email) {
    console.log(
      "\nUsage: npm run delete-user -- <email> [--yes]\n\n" +
        "Without --yes this is a dry run that only shows what would be deleted.\n"
    );
    process.exit(1);
  }

  const normalized = normalize(email);
  const user = await findUser(normalized);
  const invite = (
    await db.send(new GetCommand({ TableName: INVITES, Key: { email: normalized } }))
  ).Item;
  const sessionIds = user ? await findSessionIds(user.userId) : [];

  if (!user && !invite) {
    console.log(`\nNothing found for ${normalized}.\n`);
    return;
  }

  console.log(`\nData held for ${normalized}:`);
  console.log(`  user record   ${user ? `yes (${user.userId}, ${user.name})` : "none"}`);
  console.log(`  sessions      ${sessionIds.length}`);
  console.log(`  invite        ${invite ? invite.status : "none"}`);

  if (!confirmed) {
    console.log("\nDry run. Re-run with --yes to delete all of the above.\n");
    return;
  }

  // Sessions first, so a live login can't outlive the account.
  await deleteSessions(sessionIds);
  if (user) {
    await db.send(new DeleteCommand({ TableName: USERS, Key: { userId: user.userId } }));
  }
  if (invite) {
    await db.send(new DeleteCommand({ TableName: INVITES, Key: { email: normalized } }));
  }

  console.log(
    `\n✓ Deleted ${normalized}. Reply to their request confirming the date ` +
      `(${new Date().toISOString().slice(0, 10)}).\n`
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
