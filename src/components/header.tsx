"use client";

import Link from "next/link";
import { UserButton } from "@daveyplate/better-auth-ui";
import { Button } from "./ui/button";
import { authClient } from "@/lib/auth-client";

export function Header() {
  const { data: session } = authClient.useSession();

  return (
    <header className="sticky top-0 z-50 px-4 py-3 border-b bg-background/60 backdrop-blur">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 text-base sm:text-lg font-semibold">
            PCIT Platform
          </Link>

          {session?.user && (
            <nav className="flex items-center gap-2 text-sm sm:text-base">
              <Link href="/caregivers">
                <Button variant="ghost" className="px-2 sm:px-4">Main</Button>
              </Link>
              <Link href="/invite">
                <Button variant="ghost" className="px-2 sm:px-4">Invite</Button>
              </Link>
            </nav>
          )}
        </div>
        <UserButton />
      </div>
    </header>
  );
}
