"use server";

import { db } from "@/database/db";
import { specialtime } from "@/database/schema";
import { and, gte, lte, eq } from "drizzle-orm";

export async function fetchSpecialTimes(caregiverId: string) {
  const sessions = await db
    .select()
    .from(specialtime)
    .where(eq(specialtime.caregiversId, caregiverId));

  return sessions;
}

export async function fetchCaregiverSessions(caregiverId: string, startDate: Date, endDate: Date) {
  const sessions = await db
    .select()
    .from(specialtime)
    .where(
      and(
        eq(specialtime.caregiversId, caregiverId),
        gte(specialtime.createdAt, startDate),
        lte(specialtime.createdAt, endDate)
      )
    );

  return sessions;
}
