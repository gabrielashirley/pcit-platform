// src/app/api/check-code/route.ts
import { db } from "@/database/db";
import { oneTimeCodes } from "@/database/schema/oneTimeCodes";
import { caregivers } from "@/database/schema/caregivers";
import { eq } from "drizzle-orm";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  if (!code) {
    return Response.json({ success: false, message: "Code not provided" }, { status: 400 });
  }

  // Check for the code
  const result = await db.query.oneTimeCodes.findFirst({
    where: eq(oneTimeCodes.code, code),
    with: {
      caregiver: true, // Assuming you defined a relation
    },
  });

  if (!result || !result.used || !result.caregiversId) {
    return Response.json({ success: false }, { status: 404 });
  }

  // Fetch caregiver info
  const [caregiver] = await db
    .select()
    .from(caregivers)
    .where(eq(caregivers.id, result.caregiversId));

  if (!caregiver) {
    return Response.json({ success: false }, { status: 404 });
  }

  return Response.json({ success: true, caregiver });
}
