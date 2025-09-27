import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const classId = searchParams.get("classId");

  if (!classId) {
    return NextResponse.json({ message: "Informe a turma." }, { status: 400 });
  }

  const [classInfo, students, attendances, visitorLogs, offeringLogs, classReports] = await Promise.all([
    prisma.class.findUnique({ where: { id: classId }, select: { id: true, name: true, quarter: true, year: true } }),
    prisma.student.findMany({ where: { classId }, select: { id: true } }),
    prisma.attendance.findMany({
      where: { classId },
      orderBy: { date: "asc" },
      select: {
        id: true,
        date: true,
        present: true,
        visitors: true,
        offeringValue: true,
      },
    }),
    prisma.visitorLog.findMany({ where: { classId }, orderBy: { date: "asc" } }),
    prisma.offeringLog.findMany({ where: { classId }, orderBy: { date: "asc" } }),
    prisma.classReport.findMany({ where: { classId }, orderBy: [{ year: "desc" }, { quarter: "desc" }] }),
  ]);

  const totalStudents = students.length;

  const attendanceBySunday = attendances.reduce<Record<string, { date: string; presences: number; visitors: number; offering: number }>>(
    (acc, record) => {
      const key = record.date.toISOString().split("T")[0];
      if (!acc[key]) {
        acc[key] = {
          date: key,
          presences: 0,
          visitors: 0,
          offering: 0,
        };
      }
      acc[key].presences += record.present ? 1 : 0;
      acc[key].visitors += record.visitors ?? 0;
      acc[key].offering += Number(record.offeringValue ?? 0);
      return acc;
    },
    {}
  );

  const visitorCount = visitorLogs.length + Object.values(attendanceBySunday).reduce((sum, item) => sum + item.visitors, 0);
  const totalOfferings =
    Object.values(attendanceBySunday).reduce((sum, item) => sum + item.offering, 0) +
    offeringLogs.reduce((sum, log) => sum + Number(log.amount ?? 0), 0);

  return NextResponse.json({
    data: {
      class: classInfo,
      totalStudents,
      attendanceBySunday: Object.values(attendanceBySunday),
      visitorCount,
      totalOfferings,
      reports: classReports.map((report) => ({
        id: report.id,
        year: report.year,
        quarter: report.quarter,
        enrolled: report.enrolled,
        presences: report.presences,
        absences: report.absences,
        percentPresent: report.percentPresent,
        visitors: report.visitors,
        totalAssistances: report.totalAssistances,
        bibles: report.bibles,
        offerings: Number(report.offerings ?? 0),
        quarterlyGrade: report.quarterlyGrade,
        annualClassGrade: report.annualClassGrade,
        observations: report.observations,
      })),
    },
  });
}
