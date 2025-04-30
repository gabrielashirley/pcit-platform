import type { Metadata } from "next";
import "./globals.css";
// import "/Users/takadanana/Desktop/Startup/pcit-platform/styles/globals.css"
import { Header } from "@/components/header"
import type { ReactNode } from "react"
import { Providers } from "./providers"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarWrapper } from "@/components/sidebar_wrapper"; // NEW
import { auth } from "@/lib/auth";

export const metadata: Metadata = {
  title: "PCIT Platform",
  description: "Parent-Child Interaction Therapy Platform",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let session;
  try {
    session = await auth();
  } catch (error) {
    console.error("Auth error:", error);
    session = null;
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        <Providers>
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <div className="flex flex-1">
              {session?.user && <AppSidebar />}
              <main className="flex-1 overflow-y-auto">
                <div className="container mx-auto p-4 md:p-6">
                  {children}
                </div>
              </main>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
