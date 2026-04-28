"use client";

import React, { useState } from "react";
import ResumeInput from "../components/ResumeInput";
import Suggestions from "../components/Suggestions";

// Import the ResumeFeedback type from Suggestions.tsx
import type { ResumeFeedback } from "../components/Suggestions";

export default function HomePage() {
  const [suggestions, setSuggestions] = useState<ResumeFeedback | null>(null);
  const [loading, setLoading] = useState(false);

  const handleTextSubmit = async (resumeText: string) => {
    setLoading(true);
    try {
      const response = await fetch("/api/enhance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resume: resumeText }),
      });

      const data = await response.json();
      // ✅ data.suggestions should match ResumeFeedback schema
      setSuggestions(data.suggestions);
    } catch (err) {
      console.error("Error enhancing resume:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-4">AI Resume Enhancer</h1>

      {/* Resume input box */}
      <ResumeInput onTextSubmit={handleTextSubmit} />

      {/* Show loading state */}
      {loading && <p className="mt-4 text-gray-600">Enhancing resume...</p>}

      {/* Show suggestions if available */}
      {suggestions && <Suggestions feedback={suggestions} />}
    </main>
  );
}

