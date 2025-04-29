"use client";

import { useState, useEffect } from "react";
import { SpecialTimePicker } from "@/components/specialtimeDatePicker";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { useParams } from "next/navigation";
import { fetchSpecialTimeByDate } from "@/app/actions/fetchSpecialTime"; // ✅
import { fetchUtterance } from "@/app/actions/fetchUtterance";

export default function SessionLogPage() {
  const params = useParams();
  const caregiverId = params?.caregiverId as string;

  const [date, setDate] = useState<Date | undefined>(undefined);
  const [skills, setSkills] = useState({
    praise: 0,
    describe: 0,
    reflection: 0,
    command: 0,
    question: 0,
    negativeTalk: 0,
  });

  const [logs, setLogs] = useState<
    { child: string; parent: string; label: string }[]
  >([]);

  useEffect(() => {
    async function loadSession() {
      if (!date || !caregiverId) return;

      const sessions = await fetchSpecialTimeByDate(caregiverId, date);

      if (sessions.length > 0) {
        const session = sessions[0];

        setSkills({
          praise: session.praise,
          describe: session.describe,
          reflection: session.reflect,
          command: session.command,
          question: session.question,
          negativeTalk: session.negativeTalk,
        });

        // ✅ Now fetch utterances based on session id
        const utterances = await fetchUtterance(session.id);

        const mappedLogs = utterances.map((u) => ({
          child: u.child_utteranceText || "",     // adapt to your field names
          parent: u.parent_utteranceText || "",   // adapt to your field names
          label: u.skillCode || "",          // adapt to your field names
        }));

        setLogs(mappedLogs);
      } else {
        setSkills({
          praise: 0,
          describe: 0,
          reflection: 0,
          command: 0,
          question: 0,
          negativeTalk: 0,
        });
        setLogs([]);
      }
    }

    loadSession();
  }, [date, caregiverId]);

  function handleAddNewEntry() {
    setLogs([...logs, { child: "", parent: "", label: "" }]);
  }

  return (
    <main className="p-8">
      {/* Top nav */}
      <div className="flex space-x-6 mb-6">
        <Link
          href={`./summary`}
          className="text-2xl font-semibold text-gray-500 hover:text-blue-500"
        >
          Summary
        </Link>
        <Link
          href={`./log}`}
          className="text-2xl font-semibold text-blue-500"
        >
          Session Log
        </Link>
      </div>

      {/* Date picker and Add button */}
      <div className="flex items-end gap-6 mb-6">
        <div>
          <SpecialTimePicker
            caregiverId={caregiverId}
            onDateSelect={(pickedDate) => setDate(pickedDate)}
          />
        </div>

        <Button className="ml-auto" variant="outline" onClick={handleAddNewEntry}>
          New Entry
        </Button>
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

      {/* Logs Table */}
      <div>
        <Table>
          <TableCaption>DPICS based labelling</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Child</TableHead>
              <TableHead>Parent</TableHead>
              <TableHead>Code</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {logs.map((log, index) => (
              <TableRow key={index}>
                <TableCell>{log.child}</TableCell>
                <TableCell>{log.parent}</TableCell>
                <TableCell>{log.label}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}
