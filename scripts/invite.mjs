#!/usr/bin/env node
/**
 * Manage the invite allowlist from the terminal.
 *
 * Mainly for bootstrapping the first admin, before anyone can log in to use
 * the /admin/invites page. After that, the web UI is usually easier.
 *
 *   npm run invite -- someone@example.com     add an invite
 *   npm run invite -- --list                  show all invites
 *   npm run invite -- --remove someone@…      revoke an invite
 *
 * Note: this duplicates a little logic from app/lib/invites.ts on purpose —
 * that file is TypeScript with a `server-only` import, so a plain node script
 * can't load it without adding a TS runner dependency.
 */

import {
  DeleteCommand,
  DynamoDBDocumentClient,
  PutCommand,
  ScanCommand,
} from "@aws-sdk/lib-dynamodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

const region = process.env.AWS_REGION ?? "us-east-1";
const INVITES = process.env.INVITES_TABLE ?? "remedy-invites";

const db = DynamoDBDocumentClient.from(
  new DynamoDBClient({
    region,
    ...(process.env.DYNAMODB_ENDPOINT
      ? { endpoint: process.env.DYNAMODB_ENDPOINT }
      : {}),
  }),
  { marshallOptions: { removeUndefinedValues: true } }
);

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const normalize = (email) => email.trim().toLowerCase();

function usage() {
  console.log(
    [
      "",
      "Manage Remedy invites",
      "",
      "  npm run invite -- <email>              invite someone",
      "  npm run invite -- --list               list all invites",
      "  npm run invite -- --remove <email>     revoke an invite",
      "",
    ].join("\n")
  );
}

async function list() {
  const result = await db.send(new ScanCommand({ TableName: INVITES }));
  const invites = (result.Items ?? []).sort((a, b) =>
    String(b.invitedAt).localeCompare(String(a.invitedAt))
  );

  if (invites.length === 0) {
    console.log("\nNo invites yet.\n");
    return;
  }

  console.log(`\n${invites.length} invite(s):\n`);
  for (const invite of invites) {
    const status = invite.status === "redeemed" ? "joined " : "pending";
    const when = String(invite.invitedAt).slice(0, 10);
    console.log(`  [${status}]  ${invite.email.padEnd(32)} invited ${when}`);
  }
  console.log("");
}

async function add(email) {
  const normalized = normalize(email);

  if (!EMAIL_PATTERN.test(normalized)) {
    console.error(`\n"${email}" doesn't look like a valid email address.\n`);
    process.exit(1);
  }

  try {
    await db.send(
      new PutCommand({
        TableName: INVITES,
        Item: {
          email: normalized,
          status: "pending",
          invitedAt: new Date().toISOString(),
          invitedBy: "cli",
        },
        ConditionExpression: "attribute_not_exists(email)",
      })
    );
  } catch (error) {
    if (error.name === "ConditionalCheckFailedException") {
      console.error(`\n${normalized} has already been invited.\n`);
      process.exit(1);
    }
    throw error;
  }

  console.log(`\n✓ Invited ${normalized}`);
  console.log(`  They can now sign up at /signup using that exact email.\n`);
}

async function remove(email) {
  const normalized = normalize(email);
  await db.send(
    new DeleteCommand({ TableName: INVITES, Key: { email: normalized } })
  );
  console.log(`\n✓ Removed ${normalized}`);
  console.log(
    "  Note: this only blocks future signups. If they already have an\n" +
      "  account, it stays active.\n"
  );
}

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0 || args[0] === "--help" || args[0] === "-h") {
    usage();
    return;
  }

  if (args[0] === "--list" || args[0] === "-l") {
    await list();
    return;
  }

  if (args[0] === "--remove" || args[0] === "-r") {
    if (!args[1]) {
      console.error("\n--remove needs an email address.\n");
      process.exit(1);
    }
    await remove(args[1]);
    return;
  }

  await add(args[0]);
}

main().catch((error) => {
  console.error("\nFailed:", error.message);

  if (/credential/i.test(error.message)) {
    console.error("Add your AWS keys to .env.local (see .env.example).\n");
  } else if (error.name === "ResourceNotFoundException") {
    console.error(`Table "${INVITES}" not found. Run: npm run setup-dynamo\n`);
  }

  process.exit(1);
});
