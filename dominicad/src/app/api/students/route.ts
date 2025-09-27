import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const classId = searchParams.get("classId");

  if (!classId) {
    return NextResponse.json({ message: "Informe a turma." }, { status: 400 });
  }

  const students = await prisma.student.findMany({
    where: { classId },
    orderBy: [{ orderNumber: "asc" }],
    select: {
      id: true,
      orderNumber: true,
      name: true,
      age: true,
      birthDay: true,
      birthMonth: true,
      enrollmentDate: true,
      address: true,
      observation: true,
    },
  });

  return NextResponse.json({ data: students });
}

export async function POST(request: Request) {
  const payload = await request.json();
  const { classId, orderNumber, name, age, birthDay, birthMonth, enrollmentDate, address, observation } = payload ?? {};

  if (!classId || !orderNumber || !name) {
    return NextResponse.json({ message: "Número, nome e turma são obrigatórios." }, { status: 400 });
  }

  const created = await prisma.student.create({
    data: {
      classId,
      orderNumber,
      name,
      age,
      birthDay,
      birthMonth,
      enrollmentDate: enrollmentDate ? new Date(enrollmentDate) : undefined,
      address,
      observation,
    },
    select: {
      id: true,
      orderNumber: true,
      name: true,
      age: true,
      birthDay: true,
      birthMonth: true,
      enrollmentDate: true,
      address: true,
      observation: true,
    },
  });

  return NextResponse.json({ data: created }, { status: 201 });
}
