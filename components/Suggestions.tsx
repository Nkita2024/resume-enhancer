"use client";

import React from "react";
import jsPDF from "jspdf";

interface SectionFeedback {
  strengths: string[];
  suggestions: string[];
}

interface ResumeFeedback {
  summary: SectionFeedback;
  experience: SectionFeedback;
  skills: SectionFeedback;
  formatting: SectionFeedback;
  ats_friendly: SectionFeedback;
  ats_match?: {
    score: number;
    rating: string;
  };
}

export default function Suggestions({ feedback }: { feedback: ResumeFeedback }) {
  const handleDownloadText = () => {
    const blob = new Blob([JSON.stringify(feedback, null, 2)], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "enhanced_resume.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text("Enhanced Resume Suggestions", 10, 10);

    let y = 20;
    Object.entries(feedback).forEach(([section, data]) => {
      if (section === "ats_match") return; // handled separately
      doc.text(section.toUpperCase(), 10, y);
      y += 10;

      if ("strengths" in data) {
        doc.text("Strengths:", 10, y);
        y += 10;
        data.strengths.forEach((s: string) => {
          doc.text(`- ${s}`, 15, y);
          y += 10;
        });
      }

      if ("suggestions" in data) {
        doc.text("Suggestions:", 10, y);
        y += 10;
        data.suggestions.forEach((s: string) => {
          doc.text(`- ${s}`, 15, y);
          y += 10;
        });
      }

      y += 10;
    });

    if (feedback.ats_match) {
      doc.text("ATS Compatibility", 10, y);
      y += 10;
      doc.text(`Score: ${feedback.ats_match.score}%`, 15, y);
      y += 10;
      doc.text(`Rating: ${feedback.ats_match.rating}`, 15, y);
    }

    doc.save("enhanced_resume.pdf");
  };

  return (
    <div className="space-y-6">
      {Object.entries(feedback).map(([section, data]) => {
        if (section === "ats_match") return null; // handled separately
        return (
          <div key={section} className="border p-4 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold capitalize mb-4">{section.replace("_", " ")}</h2>
            <div className="grid grid-cols-2 gap-6">
              {/* Strengths */}
              <div>
                <h3 className="text-green-600 font-bold mb-2">✅ Good</h3>
                <ul className="list-disc list-inside space-y-1">
                  {data.strengths.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* Suggestions */}
              <div>
                <h3 className="text-yellow-600 font-bold mb-2">🔧 Needs Improvement</h3>
                <ul className="list-disc list-inside space-y-1">
                  {data.suggestions.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        );
      })}

      {/* ATS Compatibility */}
      {feedback.ats_match && (
        <div className="border p-4 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold">ATS Compatibility</h2>
          <p className="mt-2">📊 Score: {feedback.ats_match.score}%</p>
          <p className="mt-1">⭐ Rating: {feedback.ats_match.rating}</p>
        </div>
      )}

      {/* Download Buttons */}
      <div className="flex gap-4 mt-6">
        <button
          onClick={handleDownloadText}
          className="bg-gray-600 text-white px-4 py-2 rounded"
        >
          Download as Text
        </button>
        <button
          onClick={handleDownloadPDF}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Download as PDF
        </button>
      </div>
    </div>
  );
}

