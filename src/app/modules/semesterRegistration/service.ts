import { SemesterRegistration ,Prisma,PrismaClient} from "@prisma/client";

const prisma = new PrismaClient()

const registerSemester=async(payload:SemesterRegistration)=>{
    const response = await prisma.semesterRegistration.create({
        data:payload
    })
    return response 
}

export const semesterRegistrationService = {
    registerSemester
}