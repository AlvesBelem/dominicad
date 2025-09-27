import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const payload = await request.json();

  return NextResponse.json(
    {
      message: "Usuário criado com sucesso",
      workspace: {
        id: "workspace-demo",
        church: payload.church,
        plan: payload.plan ?? "free",
      },
    },
    { status: 201 }
  );
}
