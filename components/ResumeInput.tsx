"use client";
import { useState } from "react";

export default function ResumeInput({ onTextSubmit }: { onTextSubmit: (text: string) => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [resumeText, setResumeText] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    // Case 1: pasted text
    if (resumeText.trim()) {
      onTextSubmit(resumeText);
      return;
    }

    // Case 2: uploaded file
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        alert("Upload failed: " + (await res.text()));
        return;
      }

      const data = await res.json();
      if (data.text) {
        onTextSubmit(data.text);   // ✅ critical call
      } else {
        alert("No text extracted from file");
      }
    }
  };

  return (
    <div className="space-y-4">
      <textarea
        className="w-full border p-2 rounded"
        rows={8}
        value={resumeText}
        onChange={(e) => setResumeText(e.target.value)}
        placeholder="Paste your resume text here..."
      />
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={handleSubmit}
      >
        Enhance Resume
      </button>
    </div>
  );
}

