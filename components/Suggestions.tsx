"use client";

import React from "react";

export default function Suggestions({ feedback }: { feedback: string }) {
  return (
    <div className="border p-4 rounded-lg shadow-sm mt-6">
      <h2 className="text-xl font-semibold mb-2">Resume Suggestions</h2>
      <p className="whitespace-pre-line text-gray-700">{feedback}</p>
    </div>
  );
}

