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
    // Case 1: If user pasted text
    if (resumeText.trim()) {
      onTextSubmit(resumeText);
      return;
    }

    // Case 2: If user uploaded a file
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
      onTextSubmit(data.text); // Pass extracted text to parent
    }
  };

  return (
    <div>
      <textarea
        placeholder="Paste your resume here…"
        className="border p-2 w-full mb-4"
        value={resumeText}
        onChange={(e) => setResumeText(e.target.value)}
      />
      <input type="file" onChange={handleFileChange} />
      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 mt-2 rounded"
      >
        Enhance Resume
      </button>
    </div>
  );
}

