"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { fetchCaregivers } from "../actions/fetchCaregivers";
import { Skeleton } from "@/components/ui/skeleton";

export default function CaregiversPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["caregivers"],
    queryFn: fetchCaregivers
  });

  if (isLoading) {
    return (
      <section className="p-6">
        <h1 className="text-xl font-bold mb-6">Caregivers</h1>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-16 w-full max-w-xl" />
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="p-6">
        <h1 className="text-xl font-bold mb-6">Caregivers</h1>
        <div className="p-4 border border-destructive rounded-lg bg-destructive/10">
          <p className="text-destructive">Error loading caregivers. Please try again later.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="p-6" aria-labelledby="caregivers-heading">
      <h1 id="caregivers-heading" className="text-2xl font-bold mb-6">Caregivers</h1>

      <nav aria-label="Caregivers list">
        <ul className="space-y-4">
          {data?.map((caregiver) => (
            <li key={caregiver.id}>
              <Link
                href={`/caregivers/${caregiver.id}/summary`}
                className="block max-w-2xl p-4 border rounded-lg shadow-md hover:bg-gray-100 hover:text-blue-500 transition-colors"
                aria-label={`View details for ${caregiver.name}`}
              >
                <p className="font-semibold">{caregiver.name}</p>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}
