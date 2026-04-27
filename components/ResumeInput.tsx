"use client";
import { useState } from "react";

export default function ResumeInput({ onSubmit }: { onSubmit: (resume: string) => void }) {
  const [resume, setResume] = useState("");

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setResume(data.text); // extracted text
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <textarea
        className="w-full border rounded p-2 h-48"
        placeholder="Paste your resume here..."
        value={resume}
        onChange={(e) => setResume(e.target.value)}
      />
      <input
        type="file"
        accept="application/pdf"
        className="mt-4"
        onChange={handleFileUpload}
      />
      <button
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        onClick={() => onSubmit(resume)}
      >
        Enhance Resume
      </button>
    </div>
  );
}

