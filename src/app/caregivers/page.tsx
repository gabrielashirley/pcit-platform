"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { fetchCaregivers } from "../actions/fetchCaregivers"; // adjust path

export default function CaregiversPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["caregivers"],
    queryFn: fetchCaregivers
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading caregivers</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">My Caregivers</h1>

      <div className="space-y-4">
        {data?.map((caregiver) => (
          <Link
          key={caregiver.id}
          href={`/caregivers/${caregiver.id}/summary`} // <-- link to summary
          className="block p-4 border rounded-lg shadow-md hover:bg-gray-100"
        >
          <p><strong>{caregiver.name}</strong></p>
        </Link>
        ))}
      </div>
    </div>
  );
}
