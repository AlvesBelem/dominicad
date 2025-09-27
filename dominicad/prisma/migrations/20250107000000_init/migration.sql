-- CreateTable
CREATE TABLE "User" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "email" TEXT NOT NULL,
  "passwordHash" TEXT,
  "churchName" TEXT,
  "teacherName" TEXT,
  "superintendent" TEXT,
  "plan" TEXT DEFAULT 'free',
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Class" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "name" TEXT NOT NULL,
  "year" INTEGER NOT NULL,
  "quarter" INTEGER NOT NULL,
  "headerNote" TEXT,
  "professorName" TEXT,
  "superintendent" TEXT,
  "churchName" TEXT,
  "userId" TEXT NOT NULL,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" DATETIME NOT NULL,
  CONSTRAINT "Class_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Student" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "orderNumber" INTEGER NOT NULL,
  "name" TEXT NOT NULL,
  "birthDay" INTEGER,
  "birthMonth" INTEGER,
  "age" INTEGER,
  "enrollmentDate" DATETIME,
  "address" TEXT,
  "observation" TEXT,
  "classId" TEXT NOT NULL,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" DATETIME NOT NULL,
  CONSTRAINT "Student_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Attendance" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "classId" TEXT NOT NULL,
  "studentId" TEXT,
  "date" DATETIME NOT NULL,
  "present" INTEGER NOT NULL DEFAULT 0,
  "broughtBible" INTEGER NOT NULL DEFAULT 0,
  "broughtLesson" INTEGER NOT NULL DEFAULT 0,
  "reviewedLesson" INTEGER NOT NULL DEFAULT 0,
  "offeringValue" NUMERIC NOT NULL DEFAULT 0,
  "visitors" INTEGER NOT NULL DEFAULT 0,
  "notes" TEXT,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Attendance_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "Attendance_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PersonalReport" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "studentId" TEXT NOT NULL,
  "year" INTEGER NOT NULL,
  "attendanceScore" REAL NOT NULL,
  "behaviorScore" REAL NOT NULL,
  "punctuality" REAL NOT NULL,
  "bibleKnowledge" REAL NOT NULL,
  "finalScore" REAL NOT NULL,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" DATETIME NOT NULL,
  CONSTRAINT "PersonalReport_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ClassReport" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "classId" TEXT NOT NULL,
  "year" INTEGER NOT NULL,
  "quarter" INTEGER NOT NULL,
  "enrolled" INTEGER NOT NULL,
  "presences" INTEGER NOT NULL,
  "absences" INTEGER NOT NULL,
  "percentPresent" REAL NOT NULL,
  "visitors" INTEGER NOT NULL,
  "totalAssistances" INTEGER NOT NULL,
  "bibles" INTEGER NOT NULL,
  "offerings" NUMERIC NOT NULL DEFAULT 0,
  "quarterlyGrade" REAL NOT NULL,
  "annualClassGrade" REAL,
  "observations" TEXT,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" DATETIME NOT NULL,
  CONSTRAINT "ClassReport_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "VisitorLog" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "classId" TEXT NOT NULL,
  "date" DATETIME NOT NULL,
  "name" TEXT NOT NULL,
  "age" INTEGER,
  "notes" TEXT,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "VisitorLog_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "OfferingLog" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "classId" TEXT NOT NULL,
  "date" DATETIME NOT NULL,
  "amount" NUMERIC NOT NULL DEFAULT 0,
  "note" TEXT,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "OfferingLog_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "PersonalReport_studentId_key" ON "PersonalReport"("studentId");

-- CreateIndex
CREATE INDEX "Class_userId_idx" ON "Class"("userId");

-- CreateIndex
CREATE INDEX "Student_classId_idx" ON "Student"("classId");

-- CreateIndex
CREATE INDEX "Attendance_classId_idx" ON "Attendance"("classId");

-- CreateIndex
CREATE INDEX "Attendance_studentId_idx" ON "Attendance"("studentId");

-- CreateIndex
CREATE INDEX "ClassReport_classId_idx" ON "ClassReport"("classId");

-- CreateIndex
CREATE INDEX "VisitorLog_classId_idx" ON "VisitorLog"("classId");

-- CreateIndex
CREATE INDEX "OfferingLog_classId_idx" ON "OfferingLog"("classId");
