// InvitePage.tsx
"use client";

import { useState } from "react";
import { InviteCodeCard } from "@/components/inviteCodeCard";
import { Button } from "@/components/ui/button";

export default function InvitePage() {
  const [code, setCode] = useState<string | null>(null);

  const handleGenerate = async () => {
    const res = await fetch("/api/generate-code", { method: "POST" });
    const data = await res.json();
    setCode(data.code);
  };

  return (
    <main className="max-w-md mx-auto mt-12 p-6 border rounded-xl shadow space-y-6">
      <h1 className="text-2xl font-bold">Invite a Caregiver</h1>
      <Button onClick={handleGenerate}>
        {code ? "Generate New Code" : "Generate Code"}
      </Button>
      {code && <InviteCodeCard initialCode={code} key={code} />}
    </main>
  );
}
