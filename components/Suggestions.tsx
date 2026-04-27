"use client";

export default function Suggestions({ suggestions }: { suggestions: string }) {
  if (!suggestions) return null;

  return (
    <div className="mt-6 p-4 border rounded bg-gray-50">
      <h2 className="text-xl font-semibold mb-3">AI Suggestions</h2>
      <pre className="whitespace-pre-wrap text-gray-800">
        {suggestions}
      </pre>
    </div>
  );
}

