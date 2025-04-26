"use client";

import { usePathname } from "next/navigation";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function SidebarWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const showSidebar =
    pathname?.includes("/summary") || pathname?.includes("/session-log");

  return (
    <div className="flex min-h-[calc(100vh-120px)]">
      {showSidebar && (
        <div className="w-64 bg-white border-r">
          <AppSidebar />
        </div>
      )}
      <main className="flex-1 p-6">
        {showSidebar && <SidebarTrigger />}
        {children}
      </main>
    </div>
  );
}
