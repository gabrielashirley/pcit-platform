import { db } from "@/database/db";
import { nanoid } from "nanoid"; 
import { oneTimeCodes } from "@/database/schema/oneTimeCodes";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const code = nanoid(6);

  await db.insert(oneTimeCodes).values({
    code,
    clinicianId: session.user.id,
    used: false,
    createdAt: new Date(),
  });

  return NextResponse.json({ code });
}

// export async function generateOneTimeCode() {
//     const session = await auth.api.getSession({
//         headers: await headers()
//         });

//     if (!session?.user) {
//     throw new Error("Not logged in");
//     }

//     const userId = session.user.id;
//     const code = nanoid(6); 

//     await db.insert(oneTimeCodes).values({
//         code,
//         clinicianId: userId,
//         used: false,
//         createdAt: new Date(),
//   });

//   return code;
// }