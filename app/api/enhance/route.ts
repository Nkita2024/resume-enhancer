import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { resume } = await req.json();

    if (!resume) {
      return NextResponse.json({ error: "No resume text provided" }, { status: 400 });
    }

    const response = await fetch("https://api-inference.huggingface.co/models/facebook/bart-large-cnn", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.HF_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: `Summarize and improve this resume for clarity, impact, and ATS-friendliness:\n\n${resume}`,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      return NextResponse.json({ error: errText }, { status: response.status });
    }

    const data = await response.json();
    const suggestions = data[0]?.summary_text || JSON.stringify(data);

    return NextResponse.json({ suggestions });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

