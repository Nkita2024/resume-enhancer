import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { resume } = await req.json();

    if (!resume) {
      return NextResponse.json({ error: "No resume text provided" }, { status: 400 });
    }

    console.log("HF_API_KEY exists:", !!process.env.HF_API_KEY);

    const response = await fetch("https://api-inference.huggingface.co/models/gpt2", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.HF_API_KEY}`, // must be set in Vercel env vars
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: `You are a professional resume coach.
        Analyze the following resume and provide actionable suggestions
        to improve language, structure, impact, and ATS-friendliness.
        Organize feedback into sections: Summary, Experience, Skills, Formatting.\n\n${resume}`,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      return NextResponse.json({ error: errText }, { status: response.status });
    }

    const data = await response.json();
    const suggestions = data[0]?.generated_text || "No suggestions generated.";

    return NextResponse.json({ suggestions });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

