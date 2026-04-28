"use client";

import React, { useState } from "react";
import ResumeInput from "../components/ResumeInput";
import Suggestions from "../components/Suggestions";

export default function Home() {
  const [suggestions, setSuggestions] = useState("");

  const handleTextSubmit = async (resumeText: string) => {
    try {
      const response = await fetch("/api/enhance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resume: resumeText }),
      });

      const data = await response.json();
      setSuggestions(data.suggestions); // plain string
    } catch (err: any) {
      console.error("Error enhancing resume:", err);
    }
  };

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-4">AI Resume Enhancer</h1>
      <ResumeInput onTextSubmit={handleTextSubmit} />
      {suggestions && <Suggestions feedback={suggestions} />}
    </main>
  );
}

