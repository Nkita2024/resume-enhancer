import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { resume } = await req.json();

  const response = await fetch("https://api-inference.huggingface.co/models/gpt2", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.HF_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      inputs: `You are a professional resume coach. 
      Analyze the following resume and provide actionable suggestions 
      to improve language, structure, impact, and ATS-friendliness. 
      Organize feedback into sections: Summary, Experience, Skills, Formatting.\n\n${resume}`,
    }),
  });

  const data = await response.json();
  return NextResponse.json({
    suggestions: data[0]?.generated_text || "No suggestions found.",
  });
}

