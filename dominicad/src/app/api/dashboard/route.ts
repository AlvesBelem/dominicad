import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    overview: {
      totalStudents: 132,
      averageAttendance: 0.89,
      visitorsThisMonth: 22,
      offeringTotal: 8450,
    },
    trends: [
      { label: "Jan", attendance: 0.9, offering: 680 },
      { label: "Fev", attendance: 0.88, offering: 720 },
      { label: "Mar", attendance: 0.91, offering: 710 },
    ],
  });
}
