"use server";

import { db } from "@/database/db";
import { utterances } from "@/database/schema";
import { and, gte, lte, eq } from "drizzle-orm";
import { format } from "date-fns";


export async function fetchUtterance(specialtimeId: string) {
  const sessions = await db
    .select()
    .from(utterances)
    .where(eq(utterances.sessionId, specialtimeId));

  return sessions;
}
