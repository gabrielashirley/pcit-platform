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

export default function DashboardPage() {

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
    <main className="min-h-screen sm:p-8 bg-gray-50">
      <div className="flex flex-wrap gap-4 space-x-6 mb-6">
        <Link href="./summary" className="text-sm sm:text-xl	font-semibold text-blue-500">Summary</Link>
        <Link href="./log" className=" text-sm sm:text-xl font-semibold text-gray-500 hover:text-blue-500">Session Log</Link>
      </div>

      <div className="flex flex-wrap gap-4 space-x-6 mb-6">
        <DatePickerWithRange value={range} onChange={setRange} />
        <Button
          onClick={() => setAppliedRange(range)} 
          className="text-sm sm:text-base"
         >
          Update
        </Button>
      </div>
    
      <div className="bg-whiteg p-2 sm:p-6 rounded-xl shadow mb-6">
        <h2 className="text-sm sm:text-xl font-semibold mb-4">Positive Skills</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={formattedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="createdAt" />
            <YAxis width={30}/>
            <Tooltip />
            <Line type="monotone" dataKey="praise" stroke="#8884d8" />
            <Line type="monotone" dataKey="describe" stroke="#82ca9d" />
            <Line type="monotone" dataKey="question" stroke="#ffc658" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-sm sm:text-xl font-semibold mb-4">Negative Skills</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={formattedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="createdAt" />
            <YAxis width={30}/>
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
