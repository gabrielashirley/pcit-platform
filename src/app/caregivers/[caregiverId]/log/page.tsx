"use client";

import { useState, useEffect } from "react";
import { SpecialTimePicker } from "@/components/specialtimeDatePicker";
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
import { fetchSpecialTimeByDate, fetchSpecialTimes } from "@/app/actions/fetchSpecialTime"; 
import { fetchUtterance } from "@/app/actions/fetchUtterance";
import { AddDpicsDialog } from "@/components/addDpics";
import { fetchCaregiverById } from "@/app/actions/fetchCaregivers";


export default function SessionLogPage() {
  const params = useParams();
  const caregiverId = params?.caregiverId as string;
  const [caregiverName, setCaregiverName] = useState<string | null>(null);

  useEffect(() => {
    async function loadName() {
      if (caregiverId) {
        const caregiver = await fetchCaregiverById(caregiverId);
        setCaregiverName(caregiver?.name || "Unknown");
      }
    }
    loadName();
  }, [caregiverId]);

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

      const utterances = await fetchUtterance(session.id);

      const mappedLogs = utterances.map((u) => ({
        child: u.child_utterance || "",    
        parent: u.parent_utterance || "",  
        label: u.skillcode || "",        
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

  useEffect(() => {
    loadSession();
  }, [date, caregiverId]);

  useEffect(() => {
    async function initializeDate() {
      if (!caregiverId || date) return;
  
      const sessions = await fetchSpecialTimes(caregiverId);
      if (sessions.length > 0) {
        const latest = new Date(sessions[0].createdAt);
        setDate(latest); // ✅ Set most recent date
      }
    }
  
    initializeDate();
  }, [caregiverId]);

  return (
    <main className="sm:p-8">
      <h1 className="text-xl sm:text-2xl font-bold mb-2">{caregiverName}</h1>
      <div className="flex flex-wrap gap-4 mb-6">
        <Link href="./summary" className="text-l sm:text-xl	font-semibold text-gray-500 hover:text-blue-500">Summary</Link>
        <Link href="./log" className=" text-l sm:text-xl font-semibold text-blue-500 ">Session Log</Link>
      </div>

      <div className="flex flex-wrap justify-between items-end gap-3 mb-6">
        <div>
          <SpecialTimePicker
            caregiverId={caregiverId}
            selectedDate={date}
            onDateSelect={(pickedDate) => setDate(pickedDate)}
          />
        </div>
        {caregiverId && (
        <AddDpicsDialog
          caregiverId={caregiverId}
          onSave={(newDate) => {
            setDate(newDate); 
            loadSession();  
          }}
        />
      )}

      </div>

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
      
      <div className="block sm:hidden">
        {logs.map((log, index) => (
          <div key={index} className="mb-4 p-3 border rounded">
            <p><strong>Child:</strong> {log.child}</p>
            <p><strong>Parent:</strong> {log.parent}</p>
            <p><strong>Code:</strong> {log.label}</p>
          </div>
        ))}
      </div>


      <div className="hidden sm:block">
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
