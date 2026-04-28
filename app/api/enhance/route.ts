import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { resume } = await req.json();

    if (!resume) {
      return NextResponse.json({ error: "No resume text provided" }, { status: 400 });
    }

   

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`, // must be set in Vercel env vars
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

    // Hugging Face returns an array of generated_text objects for text models
    const suggestions =
      Array.isArray(data) && data[0]?.generated_text
        ? data[0].generated_text
        : JSON.stringify(data);

    return NextResponse.json({ suggestions });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

