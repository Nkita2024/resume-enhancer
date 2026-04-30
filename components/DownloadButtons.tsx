"use client";

import React from "react";
import type { ResumeFeedback } from "./Suggestions"; // import the type

export default function DownloadButtons({ feedback }: { feedback: ResumeFeedback }) {
  const downloadFile = (type: "txt" | "json") => {
    const content =
      type === "json"
        ? JSON.stringify(feedback, null, 2)
        : Object.entries(feedback)
            .map(([section, data]) => {
              if (section === "ats_match" && data) {
                const ats = data as ResumeFeedback["ats_match"];
                return `ATS Match:\nScore: ${ats?.score}%\nRating: ${ats?.rating}\nMissing Keywords: ${ats?.missing_keywords?.join(", ")}`;
              }
              const sec = data as { strengths?: string[]; suggestions?: string[] };
              return `${section.toUpperCase()}\nStrengths:\n- ${(sec.strengths || []).join("\n- ")}\nSuggestions:\n- ${(sec.suggestions || []).join("\n- ")}`;
            })
            .join("\n\n");

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `resume-feedback.${type}`;
    link.click();
  };

  return (
    <div className="mt-6 flex gap-4">
      <button
        onClick={() => downloadFile("txt")}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Download as TXT
      </button>
      <button
        onClick={() => downloadFile("json")}
        className="px-4 py-2 bg-green-500 text-white rounded"
      >
        Download as JSON
      </button>
    </div>
  );
}

