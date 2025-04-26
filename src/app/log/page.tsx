"use client";

import { useState } from "react";
import { DatePicker } from "@/components/ui/datapicker"
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import Link from "next/link";

export default function SessionLogPage() {
  const [date, setDate] = useState<Date | undefined>(new Date("2025-04-20"));

  const [skills, setSkills] = useState({
    praise: 5,
    describe: 3,
    reflection: 4,
    command: 5,
    question: 6,
    negativeTalk: 3,
  });

  const [logs, setLogs] = useState([
    { child: "I don't like blue", parent: "That's okay, what color do you like?", label: "LP" },
    { child: "I'm mad!", parent: "You told me how you feel, good job.", label: "Reflection" },
  ]);

  function handleAddNewEntry() {
    setLogs([...logs, { child: "", parent: "", label: "" }]);
  }

  return (
    <main className="p-8">
        <div className="flex space-x-6 mb-6">
            <Link href="/summary" className="text-2xl font-semibold text-gray-500 hover:text-blue-500">Summary</Link>
            <Link href="/log" className="text-2xl font-semibold text-blue-500">Session Log</Link>
            {/* <Link href="/basic-info" className="font-semibold text-gray-600 hover:text-black">Basic Info</Link> */}
      </div>
      {/* <h1 className="text-3xl font-bold mb-8">Session Log</h1> */}

      <div className="flex items-end-safe gap-6 mb-6">
        <div>
          <DatePicker date={date} setDate={setDate} />
        </div>
        
        <Button className="ml-auto" variant="outline">New Entry</Button>
      </div>

      {/* Skill Summary */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-10">
        {[
            { label: "Label Praise", value: skills.praise },
            { label: "Behavioral Description", value: skills.describe },
            { label: "Reflection", value: skills.reflection },
            { label: "Command", value: skills.command },
            { label: "Question", value: skills.question },
            { label: "Negative Talk", value: skills.negativeTalk },
        ].map((item, index) => (
            <div key={index} className="p-4 border rounded-xl">
            <div className="text-sm text-gray-600">{item.label}</div>
            <div className="text-xl font-semibold">{item.value}</div>
            </div>
        ))}
        </div>
      
      <div>
      <Table>
        <TableCaption>DPICS based labelling</TableCaption>
        <TableHeader>
            <TableRow>
            <TableHead className="w-[100px]">Child</TableHead>
            <TableHead>Parents</TableHead>
            <TableHead>Code</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {logs.map((log, index) => (
                <TableRow>
                    <TableCell className="font-medium">{log.child}</TableCell>
                    <TableCell>{log.parent}</TableCell>
                    <TableCell>{log.label}</TableCell>
                    {/* <TableCell className="text-right">$250.00</TableCell> */}
                </TableRow>
            ))}
            
        </TableBody>
        </Table>
    </div>

    </main>
  );
}
