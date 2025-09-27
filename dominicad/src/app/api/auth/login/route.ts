import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const payload = await request.json();

  return NextResponse.json({
    token: "jwt-demo-token",
    user: {
      id: "user-demo",
      email: payload.email,
      church: "Igreja Batista Esperança",
      plan: "essential",
    },
  });
}
