import { OfferedCourse, Prisma, PrismaClient } from "@prisma/client";
import { IOfferedCourse, IOfferedCourseResponse } from "./interface";
import ApiError from "../../../errors/ApiError";

const prisma = new PrismaClient();

const insertOfferedCourse = async (payload: IOfferedCourse):Promise<OfferedCourse[] | null> => {
  const { academicDepartmentId, semesterRegistrationId, courseIds } = payload;

  const notexistants = await prisma.offeredCourse.findMany({
    where: {
      courseId: {
        in: [...courseIds],
      },
    },
    select: {
      courseId: true,
    },
  });

  const existingCourseIdSet = new Set(
    notexistants.map((item) => item.courseId)
  );

  const courseIdToInsertFiltered = courseIds.filter(
    (name) => !existingCourseIdSet.has(name)
  );

  if (courseIdToInsertFiltered.length > 0) {

    const createManyData = courseIdToInsertFiltered.map((courseId: string) => ({
      academicDepartmentId: academicDepartmentId,
      semesterRegistrationId: semesterRegistrationId,
      courseId: courseId,
    }));

     const response =  await prisma.offeredCourse.createMany({
      data: createManyData,
    });

      const foundRecords = await prisma.offeredCourse.findMany({
      where: {
          AND:[
              {
                  academicDepartmentId:{
                      in:[academicDepartmentId,semesterRegistrationId],
                  }
              },{
                  semesterRegistrationId:{
                      in:[academicDepartmentId,semesterRegistrationId]
                  }
              }
          ]
      },
      include:{
          course:true,
          academicDepartment:true,
          semesterRegistration:true
      }
    });
    return foundRecords
  }else {
    return null
  }

  //   const isExist = await prisma.offeredCourse.findFirst({
  //     where:{
  //         academicDepartmentId:academicDepartmentId,
  //         semesterRegistrationId:semesterRegistrationId,
  //         courseId:{
  //             in:[...courseIds]
  //         }
  //     }
  //   })
  //   if(isExist){
  //     throw new ApiError(400, 'This course already offered')
  //   }

  //   const createManyData = courseIds.map((courseId: string) => ({
  //     academicDepartmentId: academicDepartmentId,
  //     semesterRegistrationId: semesterRegistrationId,
  //     courseId: courseId,
  //   }));

  //  const response =  await prisma.offeredCourse.createMany({
  //     data: createManyData,
  //   });

  //   const foundRecords = await prisma.offeredCourse.findMany({
  //     where: {
  //         AND:[
  //             {
  //                 academicDepartmentId:{
  //                     in:[academicDepartmentId,semesterRegistrationId],
  //                 }
  //             },{
  //                 semesterRegistrationId:{
  //                     in:[academicDepartmentId,semesterRegistrationId]
  //                 }
  //             }
  //         ]
  //     },
  //     include:{
  //         course:true,
  //         academicDepartment:true,
  //         semesterRegistration:true
  //     }
  //   });
  //   return foundRecords
};

export const offeredCourseService = {
  insertOfferedCourse,
};
