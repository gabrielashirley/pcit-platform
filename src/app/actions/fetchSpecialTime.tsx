"use server";

import { SpecialTimePicker } from "@/components/specialtimeDatePicker";
import { db } from "@/database/db";
import { specialtime } from "@/database/schema";
import { and, gte, lte, eq, desc} from "drizzle-orm";
import { format } from "date-fns";

export async function fetchSpecialTimes(caregiverId: string) {
  const sessions = await db
    .select()
    .from(specialtime)
    .where(eq(specialtime.caregiversId, caregiverId))
    .orderBy(desc(specialtime.createdAt));

  return sessions.map((s) => ({
    ...s,
    createdAt: s.createdAt.toISOString(),
    updatedAt: s.updatedAt.toISOString(),
  }));
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

export async function fetchSpecialTimeByDate(caregiverId: string, date: Date) {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  const sessions = await db
    .select()
    .from(specialtime)
    .where(
      and(
        eq(specialtime.caregiversId, caregiverId),
        gte(specialtime.createdAt, startOfDay),
        lte(specialtime.createdAt, endOfDay)
      )
    );

  return sessions.map((s) => ({
    ...s,
    createdAt: s.createdAt.toISOString(),
    updatedAt: s.updatedAt.toISOString(),
  }));
}

export async function createDPICS(
  caregiverId: string,
  date: Date,
  skills: {
    praise: number;
    describe: number;
    reflection: number;
    command: number;
    question: number;
    negativeTalk: number;
  }
) {
  const result = await db.insert(specialtime).values({
    caregiversId: caregiverId,
    createdAt: date,
    updatedAt: date,
    praise: skills.praise,
    describe: skills.describe,
    reflect: skills.reflection,
    command: skills.command,
    question: skills.question,
    negativeTalk: skills.negativeTalk,
  });
}

export async function updateSpecialTime(
  sessionId: string,
  skills: {
    praise: number;
    describe: number;
    reflection: number;
    command: number;
    question: number;
    negativeTalk: number;
  }
) {
  await db
    .update(specialtime)
    .set({ ...skills, updatedAt: new Date() })
    .where(eq(specialtime.id, sessionId));
}