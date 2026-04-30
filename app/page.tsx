"use client";

import React, { useState } from "react";
import ResumeInput from "../components/ResumeInput";
import Suggestions, { ResumeFeedback } from "../components/Suggestions";

export default function Page() {
  const [suggestions, setSuggestions] = useState<ResumeFeedback | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTextSubmit = async (resumeText: string) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/enhance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resume: resumeText }),
      });

      const data = await res.json();

      if (data.error) {
        setError(data.error);
      } else {
        // suggestions is structured JSON from backend
        setSuggestions(data.suggestions as ResumeFeedback);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">AI Resume Enhancer</h1>
      <ResumeInput onTextSubmit={handleTextSubmit} />

      {loading && <p className="mt-4 text-gray-500">Generating suggestions...</p>}
      {error && <p className="mt-4 text-red-600">Error: {error}</p>}

      {suggestions && <Suggestions feedback={suggestions} />}
    </main>
  );
}

