import { NextResponse } from "next/server";

const classes = [
  { id: "class-1", name: "Adolescentes", quarter: "1º/2025" },
  { id: "class-2", name: "Jovens", quarter: "1º/2025" },
  { id: "class-3", name: "Senhoras", quarter: "1º/2025" },
];

export async function GET() {
  return NextResponse.json({ data: classes });
}

export async function POST(request: Request) {
  const payload = await request.json();
  const created = { id: `class-${Date.now()}`, ...payload };
  return NextResponse.json({ data: created }, { status: 201 });
}
