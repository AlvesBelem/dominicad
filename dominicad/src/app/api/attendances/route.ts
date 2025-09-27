import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const classId = searchParams.get("classId");
  const date = searchParams.get("date");

  if (!classId) {
    return NextResponse.json({ message: "Informe a turma." }, { status: 400 });
  }

  const whereClause = {
    classId,
    ...(date ? { date: new Date(date) } : {}),
  };

  const attendances = await prisma.attendance.findMany({
    where: whereClause,
    orderBy: [{ date: "desc" }],
    select: {
      id: true,
      date: true,
      present: true,
      broughtBible: true,
      broughtLesson: true,
      reviewedLesson: true,
      offeringValue: true,
      visitors: true,
      notes: true,
      student: {
        select: {
          id: true,
          name: true,
          orderNumber: true,
        },
      },
    },
  });

  return NextResponse.json({ data: attendances });
}

export async function POST(request: Request) {
  const payload = await request.json();

  const {
    classId,
    studentId,
    date,
    present,
    broughtBible,
    broughtLesson,
    reviewedLesson,
    offeringValue,
    visitors,
    notes,
  } = payload ?? {};

  if (!classId || !date) {
    return NextResponse.json({ message: "Turma e data são obrigatórios." }, { status: 400 });
  }

  const numericOffering =
    typeof offeringValue === "string" ? Number.parseFloat(offeringValue.replace(/,/g, ".")) : Number(offeringValue ?? 0);
  const numericVisitors = typeof visitors === "string" ? Number.parseInt(visitors, 10) : Number(visitors ?? 0);

  const record = await prisma.attendance.upsert({
    where: {
      // garante unicidade por turma, aluno (ou geral), e data
      id: `${classId}-${studentId ?? "geral"}-${date}`,
    },
    update: {
      present: Boolean(present),
      broughtBible: Boolean(broughtBible),
      broughtLesson: Boolean(broughtLesson),
      reviewedLesson: Boolean(reviewedLesson),
      offeringValue: Number.isNaN(numericOffering) ? 0 : numericOffering,
      visitors: Number.isNaN(numericVisitors) ? 0 : numericVisitors,
      notes,
    },
    create: {
      id: `${classId}-${studentId ?? "geral"}-${date}`,
      classId,
      studentId,
      date: new Date(date),
      present: Boolean(present),
      broughtBible: Boolean(broughtBible),
      broughtLesson: Boolean(broughtLesson),
      reviewedLesson: Boolean(reviewedLesson),
      offeringValue: Number.isNaN(numericOffering) ? 0 : numericOffering,
      visitors: Number.isNaN(numericVisitors) ? 0 : numericVisitors,
      notes,
    },
    select: {
      id: true,
      classId: true,
      studentId: true,
      date: true,
      present: true,
      broughtBible: true,
      broughtLesson: true,
      reviewedLesson: true,
      offeringValue: true,
      visitors: true,
      notes: true,
    },
  });

  return NextResponse.json({ data: record }, { status: 201 });
}
