import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ message: "Informe o usuário." }, { status: 400 });
  }

  const classes = await prisma.class.findMany({
    where: { userId },
    orderBy: [{ year: "desc" }, { quarter: "desc" }],
    select: {
      id: true,
      name: true,
      year: true,
      quarter: true,
      professorName: true,
      superintendent: true,
      churchName: true,
    },
  });

  return NextResponse.json({ data: classes });
}

export async function POST(request: Request) {
  const payload = await request.json();
  const { userId, name, year, quarter, professorName, superintendent, churchName } = payload ?? {};

  if (!userId || !name || !year || !quarter) {
    return NextResponse.json({ message: "Preencha os campos obrigatórios." }, { status: 400 });
  }

  const created = await prisma.class.create({
    data: {
      userId,
      name,
      year,
      quarter,
      professorName,
      superintendent,
      churchName,
    },
    select: {
      id: true,
      name: true,
      year: true,
      quarter: true,
      professorName: true,
      superintendent: true,
      churchName: true,
    },
  });

  return NextResponse.json({ data: created }, { status: 201 });
}
