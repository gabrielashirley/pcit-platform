import type { Metadata } from "next";
import "./globals.css";
// import "/Users/takadanana/Desktop/Startup/pcit-platform/styles/globals.css"
import { Header } from "@/components/header"
import { Providers } from "./providers"
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const metadata: Metadata = {
  title: "PCIT Platform",
  description: "Parent-Child Interaction Therapy Platform",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let session = null;
  try {
    const headersList = await headers();
    // @ts-ignore - better-auth types are not properly exposed
    const response = await auth.api.getSession({
      headers: headersList
    });
    if (response && response.session) {
      session = response;
    }
  } catch (error) {
    console.error("Auth error:", error);
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
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
