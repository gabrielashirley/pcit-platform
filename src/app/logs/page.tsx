"use client";

import { useState } from "react";

const fakeSessions = [
  { date: "2025-04-20", praise: 5, describe: 4, question: 3, command: 2, negativeTalk: 1 },
  { date: "2025-04-21", praise: 4, describe: 3, question: 2, command: 3, negativeTalk: 2 },
  { date: "2025-04-22", praise: 5, describe: 5, question: 4, command: 4, negativeTalk: 1 },
  { date: "2025-04-23", praise: 3, describe: 2, question: 2, command: 1, negativeTalk: 3 },
];

export default function DashboardPage() {
  const [parent, setParent] = useState<"Parent 1" | "Parent 2">("Parent 1");

  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      <div className="flex gap-4 mb-8">
        <button
          onClick={() => setParent("Parent 1")}
          className={`px-4 py-2 rounded-full ${parent === "Parent 1" ? "bg-blue-500 text-white" : "bg-white border"}`}
        >
          Parent 1
        </button>
        <button
          onClick={() => setParent("Parent 2")}
          className={`px-4 py-2 rounded-full ${parent === "Parent 2" ? "bg-blue-500 text-white" : "bg-white border"}`}
        >
          Parent 2
        </button>
      </div>

      <div className="grid gap-6">
        {fakeSessions.map((session, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-2">{session.date}</h2>
            <div className="grid grid-cols-2 gap-2 text-gray-700">
              <div>✅ Praise: {session.praise}</div>
              <div>🖌️ Describe: {session.describe}</div>
              <div>❓ Question: {session.question}</div>
              <div>🛑 Command: {session.command}</div>
              <div>🚫 Negative Talk: {session.negativeTalk}</div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
