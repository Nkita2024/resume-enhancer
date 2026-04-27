import { NextResponse } from "next/server";
import pdfParse from "pdf-parse";

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const data = await pdfParse(buffer);

  return NextResponse.json({ text: data.text });
}

