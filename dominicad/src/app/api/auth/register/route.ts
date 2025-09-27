import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const payload = await request.json();
  const { email, password, church, teacherName, superintendent, plan } = payload ?? {};

  if (!email || !password) {
    return NextResponse.json({ message: "E-mail e senha são obrigatórios." }, { status: 400 });
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return NextResponse.json({ message: "Já existe um cadastro com este e-mail." }, { status: 409 });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      passwordHash,
      churchName: church,
      teacherName,
      superintendent,
      plan: plan ?? "free",
    },
    select: {
      id: true,
      email: true,
      churchName: true,
      teacherName: true,
      superintendent: true,
      plan: true,
      createdAt: true,
    },
  });

  return NextResponse.json(
    {
      message: "Usuário criado com sucesso",
      workspace: {
        id: user.id,
        church: user.churchName,
        plan: user.plan,
      },
      profile: user,
    },
    { status: 201 }
  );
}
