import { NextResponse } from "next/server";

const students = [
  { id: "student-1", classId: "class-1", name: "Ana Souza", age: 13, enrollment: "AD-2025-01" },
  { id: "student-2", classId: "class-1", name: "Bruno Oliveira", age: 12, enrollment: "AD-2025-02" },
  { id: "student-3", classId: "class-2", name: "Camila Ribeiro", age: 20, enrollment: "JO-2025-01" },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const classId = searchParams.get("classId");
  const data = classId ? students.filter((student) => student.classId === classId) : students;
  return NextResponse.json({ data });
}

export async function POST(request: Request) {
  const payload = await request.json();
  const created = { id: `student-${Date.now()}`, ...payload };
  return NextResponse.json({ data: created }, { status: 201 });
}
