import { NextResponse } from "next/server";
import * as pdfParse from "pdf-parse";  // Import as namespace

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  // Convert uploaded file to buffer
  const buffer = Buffer.from(await file.arrayBuffer());

  // pdfParse is a function inside the namespace
  const data = await (pdfParse as any)(buffer);

  return NextResponse.json({ text: data.text });
}

