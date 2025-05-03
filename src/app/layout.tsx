import type { Metadata } from "next";
import "./globals.css";
// import "/Users/takadanana/Desktop/Startup/pcit-platform/styles/globals.css"
import { Header } from "@/components/header"
import type { ReactNode } from "react"
import { Providers } from "./providers"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
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
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background antialiased">
        <Providers>
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <div className="flex flex-1">
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
