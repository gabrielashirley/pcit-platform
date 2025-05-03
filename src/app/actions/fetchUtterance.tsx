"use server";

import { db } from "@/database/db";
import { utterances } from "@/database/schema";
import { eq } from "drizzle-orm";

export async function fetchUtterance(specialtimeId: string) {
  const sessions = await db
    .select()
    .from(utterances)
    .where(eq(utterances.sessionId, specialtimeId));

  return sessions;
}
