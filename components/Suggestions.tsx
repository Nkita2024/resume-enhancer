"use client";

import React from "react";
import DownloadButtons from "./DownloadButtons"; // import the download component

export type ResumeFeedback = {
  summary?: { strengths: string[]; suggestions: string[] };
  experience?: { strengths: string[]; suggestions: string[] };
  skills?: { strengths: string[]; suggestions: string[] };
  formatting?: { strengths: string[]; suggestions: string[] };
  ats_friendly?: { strengths: string[]; suggestions: string[] };
  ats_match?: { score: number; rating: string; missing_keywords: string[] };
};

export default function Suggestions({ feedback }: { feedback: ResumeFeedback }) {
  if (!feedback) return null;

  return (
    <div className="border p-4 rounded-lg shadow-sm mt-6 space-y-6">
      <h2 className="text-2xl font-semibold mb-4">Resume Feedback</h2>

      {/* ATS Match Section */}
      {feedback.ats_match && (
        <div className="border p-4 rounded-lg bg-gray-50">
          <h3 className="text-xl font-semibold">ATS Compatibility</h3>
          <p className="mt-2">Score: {feedback.ats_match.score}%</p>
          <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
            <div
              className="bg-green-500 h-4 rounded-full"
              style={{ width: `${feedback.ats_match.score}%` }}
            ></div>
          </div>
          <p className="mt-2">Rating: {feedback.ats_match.rating}</p>
          {feedback.ats_match.missing_keywords?.length > 0 && (
            <p className="mt-2 text-sm text-red-600">
              Missing Keywords: {feedback.ats_match.missing_keywords.join(", ")}
            </p>
          )}
        </div>
      )}

      {/* Other Sections */}
      {Object.entries(feedback).map(([section, data]) => {
        if (section === "ats_match") return null;
        const sec = data as { strengths?: string[]; suggestions?: string[] };
        return (
          <div key={section} className="border p-4 rounded-lg">
            <h3 className="text-xl font-semibold capitalize">{section}</h3>
            <div className="mt-2">
              <p className="font-semibold">Strengths:</p>
              <ul className="list-disc list-inside text-green-700">
                {(sec.strengths || []).map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>
            <div className="mt-2">
              <p className="font-semibold">Suggestions:</p>
              <ul className="list-disc list-inside text-blue-700">
                {(sec.suggestions || []).map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>
          </div>
        );
      })}

      {/* Download Buttons */}
      <DownloadButtons feedback={feedback} />
    </div>
  );
}

