"use server";

import { auth } from "@/lib/auth";
import { db } from "@/database/db";
import { caregivers } from "@/database/schema"; // adjust import
import { eq } from "drizzle-orm";
import { headers } from "next/headers";

export async function fetchCaregivers() {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session?.user) {
    throw new Error("Not logged in");
  }

  const userId = session.user.id;

  const caregiverList = await db
    .select()
    .from(caregivers)
    .where(eq(caregivers.clinicianId, userId));

  return caregiverList;
}
