import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const payload = await request.json();
  const { email, password } = payload ?? {};

  if (!email || !password) {
    return NextResponse.json({ message: "Credenciais inválidas." }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !user.passwordHash) {
    return NextResponse.json({ message: "E-mail ou senha incorretos." }, { status: 401 });
  }

  const isValid = await bcrypt.compare(password, user.passwordHash);
  if (!isValid) {
    return NextResponse.json({ message: "E-mail ou senha incorretos." }, { status: 401 });
  }

  // In a real app you would issue a JWT here.
  return NextResponse.json({
    message: "Login autorizado",
    token: "mock-token",
    workspace: {
      id: user.id,
      church: user.churchName,
      plan: user.plan,
    },
  });
}
