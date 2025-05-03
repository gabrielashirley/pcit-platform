"use client";

import { useEffect, useState } from "react";

export function InviteCodeCard({ initialCode }: { initialCode: string }) {
  const [caregiver, setCaregiver] = useState<string | null>(null);
  const [secondsLeft, setSecondsLeft] = useState(300);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    if (verified) return;

    const interval = setInterval(async () => {
      const res = await fetch(`/api/check-code?code=${initialCode}`);
      const data = await res.json();

      if (data.success && data.caregiver?.name) {
        setCaregiver(data.caregiver.name);
        setVerified(true);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [initialCode, verified]);

  useEffect(() => {
    if (verified) return;

    const timer = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(timer);
          return 0;
        }
        return s - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [verified]);

  if (verified && caregiver) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-blue-500">🎉 Connected!</h2>
        <p className="mt-4">
          <strong>{caregiver}</strong> has successfully joined your account.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Share this code with the caregiver</h2>
      <p className="text-3xl font-mono tracking-widest my-4">{initialCode}</p>
      <p className="text-sm text-muted-foreground">
        This code will expire in {secondsLeft}s.
      </p>
    </div>
  );
}
