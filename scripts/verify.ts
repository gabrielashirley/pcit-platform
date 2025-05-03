import { db } from "@/database/db";
import { caregivers } from "@/database/schema/caregivers";
import { oneTimeCodes } from "@/database/schema/oneTimeCodes";
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";

async function run() {

  const [, , code, caregiverName] = process.argv;

  // 1. Find the one-time code entry
  const [invite] = await db
    .select()
    .from(oneTimeCodes)
    .where(eq(oneTimeCodes.code, code));

  if (!invite) {
    console.error("❌ Invalid code.");
    process.exit(1);
  }

  if (invite.used) {
    console.error("⚠️ Code already used.");
    process.exit(1);
  }

  const clinicianId = invite.clinicianId;
  console.log(`ℹ️ Code belongs to clinician: ${clinicianId}`);

  // 2. Create a new caregiver
  const [newCaregiver] = await db
    .insert(caregivers)
    .values({
      name: caregiverName,
      clinicianId: clinicianId,
    })
    .returning();

  // 3. Update the one-time code with the caregiver's ID
  await db
    .update(oneTimeCodes)
    .set({
      used: true,
      caregiversId: newCaregiver.id,
    })
    .where(eq(oneTimeCodes.code, code));

  console.log(`Caregiver '${newCaregiver.name}' added and linked to code ${code}`);
  process.exit(0);
}

run().catch((err) => {
  console.error("💥 Error:", err);
  process.exit(1);
});
