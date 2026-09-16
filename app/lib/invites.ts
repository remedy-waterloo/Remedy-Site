import "server-only";

import {
  DeleteCommand,
  GetCommand,
  PutCommand,
  ScanCommand,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb";

import { db, normalizeEmail, TABLES } from "./dynamo";

export type InviteStatus = "pending" | "redeemed";

export type Invite = {
  email: string;
  status: InviteStatus;
  invitedAt: string;
  invitedBy: string;
  redeemedAt?: string;
  userId?: string;
};

export async function getInvite(email: string): Promise<Invite | null> {
  const result = await db.send(
    new GetCommand({
      TableName: TABLES.invites,
      Key: { email: normalizeEmail(email) },
    })
  );
  return (result.Item as Invite | undefined) ?? null;
}

/**
 * The invite list is small and admin-only, so a Scan is the right tool here.
 * If it ever outgrows a single page, switch to a GSI on `status`.
 */
export async function listInvites(): Promise<Invite[]> {
  const result = await db.send(new ScanCommand({ TableName: TABLES.invites }));
  const invites = (result.Items as Invite[] | undefined) ?? [];
  return invites.sort((a, b) => b.invitedAt.localeCompare(a.invitedAt));
}

export async function createInvite(
  email: string,
  invitedBy: string
): Promise<Invite> {
  const invite: Invite = {
    email: normalizeEmail(email),
    status: "pending",
    invitedAt: new Date().toISOString(),
    invitedBy,
  };

  await db.send(
    new PutCommand({
      TableName: TABLES.invites,
      Item: invite,
      // Don't let a re-invite silently wipe an already-redeemed record.
      ConditionExpression: "attribute_not_exists(email)",
    })
  );

  return invite;
}

export async function revokeInvite(email: string): Promise<void> {
  await db.send(
    new DeleteCommand({
      TableName: TABLES.invites,
      Key: { email: normalizeEmail(email) },
    })
  );
}

/**
 * Marks an invite as used. The condition is what makes an invite single-use:
 * if two signups race, only the first succeeds.
 */
export async function redeemInvite(
  email: string,
  userId: string
): Promise<boolean> {
  try {
    await db.send(
      new UpdateCommand({
        TableName: TABLES.invites,
        Key: { email: normalizeEmail(email) },
        UpdateExpression:
          "SET #status = :redeemed, redeemedAt = :now, userId = :userId",
        ConditionExpression: "attribute_exists(email) AND #status = :pending",
        ExpressionAttributeNames: { "#status": "status" },
        ExpressionAttributeValues: {
          ":redeemed": "redeemed",
          ":pending": "pending",
          ":now": new Date().toISOString(),
          ":userId": userId,
        },
      })
    );
    return true;
  } catch (error) {
    if ((error as { name?: string }).name === "ConditionalCheckFailedException") {
      return false;
    }
    throw error;
  }
}
