-- CreateTable
CREATE TABLE "offered_course_section" (
    "id" TEXT NOT NULL,
    "sectionName" TEXT NOT NULL,
    "maxCapacity" INTEGER NOT NULL,
    "currentlyEntrolledStudent" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "offeredCourseId" TEXT NOT NULL,
    "semesterRegistrationId" TEXT NOT NULL,

    CONSTRAINT "offered_course_section_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "offered_course_section" ADD CONSTRAINT "offered_course_section_offeredCourseId_fkey" FOREIGN KEY ("offeredCourseId") REFERENCES "offered_course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "offered_course_section" ADD CONSTRAINT "offered_course_section_semesterRegistrationId_fkey" FOREIGN KEY ("semesterRegistrationId") REFERENCES "semester_registration"("id") ON DELETE CASCADE ON UPDATE CASCADE;
