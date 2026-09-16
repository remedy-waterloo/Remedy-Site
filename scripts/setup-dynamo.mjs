#!/usr/bin/env node
/**
 * Creates the three DynamoDB tables Remedy auth needs, then enables TTL on
 * the sessions table so expired sessions clean themselves up.
 *
 * Usage:  node scripts/setup-dynamo.mjs
 *
 * Safe to re-run — existing tables are skipped.
 */

import {
  CreateTableCommand,
  DescribeTableCommand,
  DynamoDBClient,
  UpdateTimeToLiveCommand,
  waitUntilTableExists,
} from "@aws-sdk/client-dynamodb";

const region = process.env.AWS_REGION ?? "us-east-1";
const endpoint = process.env.DYNAMODB_ENDPOINT;

// DYNAMODB_ENDPOINT points at DynamoDB Local for offline development.
const client = new DynamoDBClient({
  region,
  ...(endpoint ? { endpoint } : {}),
});

const USERS = process.env.USERS_TABLE ?? "remedy-users";
const SESSIONS = process.env.SESSIONS_TABLE ?? "remedy-sessions";
const INVITES = process.env.INVITES_TABLE ?? "remedy-invites";

const tables = [
  {
    TableName: USERS,
    BillingMode: "PAY_PER_REQUEST",
    AttributeDefinitions: [
      { AttributeName: "userId", AttributeType: "S" },
      { AttributeName: "email", AttributeType: "S" },
    ],
    KeySchema: [{ AttributeName: "userId", KeyType: "HASH" }],
    GlobalSecondaryIndexes: [
      {
        IndexName: "email-index",
        KeySchema: [{ AttributeName: "email", KeyType: "HASH" }],
        Projection: { ProjectionType: "ALL" },
      },
    ],
  },
  {
    TableName: SESSIONS,
    BillingMode: "PAY_PER_REQUEST",
    AttributeDefinitions: [{ AttributeName: "sessionId", AttributeType: "S" }],
    KeySchema: [{ AttributeName: "sessionId", KeyType: "HASH" }],
  },
  {
    TableName: INVITES,
    BillingMode: "PAY_PER_REQUEST",
    AttributeDefinitions: [{ AttributeName: "email", AttributeType: "S" }],
    KeySchema: [{ AttributeName: "email", KeyType: "HASH" }],
  },
];

async function tableExists(name) {
  try {
    await client.send(new DescribeTableCommand({ TableName: name }));
    return true;
  } catch (error) {
    if (error.name === "ResourceNotFoundException") return false;
    throw error;
  }
}

async function main() {
  console.log(`Region:   ${region}`);
  console.log(`Endpoint: ${endpoint ?? "AWS (default)"}\n`);

  for (const definition of tables) {
    const name = definition.TableName;

    if (await tableExists(name)) {
      console.log(`✓ ${name} already exists, skipping`);
      continue;
    }

    await client.send(new CreateTableCommand(definition));
    console.log(`· ${name} creating…`);
    await waitUntilTableExists(
      { client, maxWaitTime: 120 },
      { TableName: name }
    );
    console.log(`✓ ${name} ready`);
  }

  // TTL lets DynamoDB delete expired sessions for us, at no cost.
  try {
    await client.send(
      new UpdateTimeToLiveCommand({
        TableName: SESSIONS,
        TimeToLiveSpecification: { Enabled: true, AttributeName: "ttl" },
      })
    );
    console.log(`✓ TTL enabled on ${SESSIONS} (attribute: ttl)`);
  } catch (error) {
    if (error.name === "ValidationException") {
      console.log(`✓ TTL already enabled on ${SESSIONS}`);
    } else {
      throw error;
    }
  }

  console.log("\nDone.");
}

main().catch((error) => {
  console.error("\nSetup failed:", error.message);

  if (/credential/i.test(error.message)) {
    console.error(
      [
        "",
        "No AWS credentials found. Pick one:",
        "",
        "  a) Put them in .env.local (this script reads that file):",
        "       AWS_ACCESS_KEY_ID=...",
        "       AWS_SECRET_ACCESS_KEY=...",
        "       AWS_REGION=ca-central-1",
        "",
        "  b) Or install the AWS CLI and run `aws configure`.",
        "",
        "  c) Or test locally with no AWS account at all:",
        "       DYNAMODB_ENDPOINT=http://localhost:8000 (DynamoDB Local)",
      ].join("\n")
    );
  }

  process.exit(1);
});
