import { AcademicDepartment, Course, SemesterRegistration } from "@prisma/client"

export type IOfferedCourse ={
    courseIds:string[],
    academicDepartmentId:string,
    semesterRegistrationId:string
}
export type IOfferedCourseResponse ={
    id: string,
    createdAt: string,
    updatedAt: string,
    courseId: string,
    academicDepartmentId: string,
    semesterRegistrationId:string,
    course:Course,
    academicDepartment:AcademicDepartment,
    semesterRegistration:SemesterRegistration
}