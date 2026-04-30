import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { resume } = await req.json();

    if (!resume) {
      return NextResponse.json(
        { error: "No resume text provided" },
        { status: 400 }
      );
    }

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "system",
            content: `You are a professional resume coach.
Return feedback in strict JSON format with this schema:
{
  "summary": { "strengths": [], "suggestions": [] },
  "experience": { "strengths": [], "suggestions": [] },
  "skills": { "strengths": [], "suggestions": [] },
  "formatting": { "strengths": [], "suggestions": [] },
  "ats_friendly": { "strengths": [], "suggestions": [] },
  "ats_match": { "score": 0, "rating": "", "missing_keywords": [] }
}
Ensure:
- "ats_match.score" is a number (0–100) representing ATS compatibility.
- "ats_match.rating" is a string like "Poor", "Average", "Good", "Excellent".
- "ats_match.missing_keywords" is an array of important skills/terms not found in the resume.
`
          },
          {
            role: "user",
            content: resume
          }
        ],
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      return NextResponse.json({ error: errText }, { status: response.status });
    }

    const data = await response.json();
    const rawContent = data.choices?.[0]?.message?.content || "{}";

    let suggestions;
    try {
      suggestions = JSON.parse(rawContent);
    } catch {
      suggestions = { error: "Invalid JSON returned from model", raw: rawContent };
    }

    return NextResponse.json({ suggestions });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

