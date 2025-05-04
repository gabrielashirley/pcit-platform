// app/api/check-code/route.ts
import { db } from "@/database/db";
import { oneTimeCodes } from "@/database/schema/oneTimeCodes";
import {caregivers} from "@/database/schema/caregivers"
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  if (!code) return NextResponse.json({ success: false });

  const [entry] = await db
    .select({
      caregiver: caregivers,
    })
    .from(oneTimeCodes)
    .where(eq(oneTimeCodes.code, code))
    .leftJoin(caregivers, eq(oneTimeCodes.caregiversId, caregivers.id));

  if (entry?.caregiver) {
    return NextResponse.json({ success: true, caregiver: entry.caregiver });
  }

  return NextResponse.json({ success: false });
}
