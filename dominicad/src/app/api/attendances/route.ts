import { NextResponse } from "next/server";

const attendances = [
  {
    id: "attendance-1",
    classId: "class-1",
    date: "2025-01-26",
    present: 22,
    visitors: 4,
    offerings: 455,
  },
  {
    id: "attendance-2",
    classId: "class-1",
    date: "2025-01-19",
    present: 21,
    visitors: 1,
    offerings: 360,
  },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const classId = searchParams.get("classId");
  const data = classId ? attendances.filter((item) => item.classId === classId) : attendances;
  return NextResponse.json({ data });
}

export async function POST(request: Request) {
  const payload = await request.json();
  const created = { id: `attendance-${Date.now()}`, ...payload };
  return NextResponse.json({ data: created }, { status: 201 });
}
