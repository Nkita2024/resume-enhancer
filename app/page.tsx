export default function Home() {
  const [suggestions, setSuggestions] = useState("");

  const handleTextSubmit = async (resumeText: string) => {
    try {
      const res = await fetch("/api/enhance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resume: resumeText }),
      });

      if (!res.ok) {
        const errText = await res.text();
        console.error("Enhance API error:", errText);
        setSuggestions("Error enhancing resume: " + errText);
        return;
      }

      const data = await res.json();
      setSuggestions(data.suggestions);
    } catch (err: any) {
      console.error("Unexpected error:", err);
      setSuggestions("Unexpected error: " + err.message);
    }
  };

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-4">AI Resume Enhancer</h1>
      {/* ✅ Pass the callback into ResumeInput */}
      <ResumeInput onTextSubmit={handleTextSubmit} />
      {suggestions && <Suggestions suggestions={suggestions} />}
    </main>
  );
}

