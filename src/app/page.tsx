import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col justify-center p-4 bg-gray-50">
      <h1 className="text-4xl font-bold mb-4">Welcome to the PCIT Platform</h1>
      <p className="text-gray-600 mb-6 max-w-2xl">
        This platform helps clinicians monitor and support Parent–Child Interaction Therapy (PCIT) by tracking caregiver engagement, coding sessions, and collaborating with families more effectively.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/caregivers">
          <Button variant="default">View Your Patients</Button>
        </Link>
        <Link href="/invite">
          <Button variant="outline">Generate Invite Code</Button>
        </Link>
      </div>
    </main>
  );
}
