"use client";

import { useState } from "react";
import { DatePickerWithRange } from "@/components/ui/datapickerwithrange"
import { DateRange } from "react-day-picker";

import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { fetchCaregiverSessions } from "../../../actions/fetchSpecialTime"; 
import { useParams } from "next/navigation";
import { format, subDays } from "date-fns";
import { Button } from "@/components/ui/button";

// const fakeSessions = [
//   { date: "2025-04-20", praise: 5, describe: 4, question: 3, command: 2, negativeTalk: 1 },
//   { date: "2025-04-21", praise: 4, describe: 3, question: 2, command: 3, negativeTalk: 2 },
//   { date: "2025-04-22", praise: 5, describe: 5, question: 4, command: 4, negativeTalk: 1 },
//   { date: "2025-04-23", praise: 3, describe: 2, question: 2, command: 1, negativeTalk: 3 },
// ];

export default function DashboardPage() {
//   const [parent, setParent] = useState<"Parent 1" | "Parent 2">("Parent 1");

  // const [startDate, setStartDate] = useState<Date>(subDays(new Date(), 7)); // default = 7 days ago
  // const [endDate, setEndDate] = useState<Date>(new Date()); // default = today
  const params = useParams();
  const caregiverId = params?.caregiverId as string;
  const [range, setRange] = useState<DateRange | undefined>({
    from: subDays(new Date(), 7),
    to: new Date(),
  });
  const [appliedRange, setAppliedRange] = useState<DateRange | undefined>(range); // ✅ Separate applied range

  const { data, isLoading, error } = useQuery({
    queryKey: ["caregiver-sessions", caregiverId, appliedRange?.from, appliedRange?.to],
    queryFn: () => {
      if (appliedRange?.from && appliedRange?.to) {
        return fetchCaregiverSessions(caregiverId, appliedRange.from, appliedRange.to);
      }
      return Promise.resolve([]);
    }
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading sessions</div>;
  if (!data) return null;

  const formattedData = data.map((item) => ({
    ...item,
    createdAt: format(new Date(item.createdAt), "MM/dd")
  }));

  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="flex space-x-6 mb-6">
        <Link href="./summary" className="text-2xl font-semibold text-blue-500">Summary</Link>
        <Link href="./log" className="text-2xl font-semibold text-gray-500 hover:text-blue-500">Session Log</Link>
        {/* <Link href="/basic-info" className="font-semibold text-gray-600 hover:text-black">Basic Info</Link> */}
      </div>
      {/* <h1 className="text-3xl font-bold mb-8">Dashboard</h1> */}
      <div className="flex">
        <DatePickerWithRange value={range} onChange={setRange} />
        <Button
          onClick={() => setAppliedRange(range)} 
         >
          Update
        </Button>
        </div>
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">Positive Skills</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={formattedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="createdAt" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="praise" stroke="#8884d8" />
            <Line type="monotone" dataKey="describe" stroke="#82ca9d" />
            <Line type="monotone" dataKey="question" stroke="#ffc658" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">Negative Skills</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={formattedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="createdAt" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="question" stroke="#8884d8" />
            <Line type="monotone" dataKey="command" stroke="#82ca9d" />
            <Line type="monotone" dataKey="negativeTalk" stroke="#ffc658" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </main>
  );
}
