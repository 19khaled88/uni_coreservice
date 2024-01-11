import { OfferedCourse, Prisma, PrismaClient } from "@prisma/client";
import { IOfferedCourse, IOfferedCourseResponse } from "./interface";
import ApiError from "../../../errors/ApiError";
import { IFilters, IPagination } from "../../../interfaces/paginationType";
import { IGenericResponse } from "../../../shared/constants";
import { calculatePagination } from "../../../helpers/paginationCalculate";
import { offeredCourseSearchableFields } from "./constants";


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


const offeredCourses = async(paginationOptions:IPagination,filter:IFilters):Promise<IGenericResponse<OfferedCourse[]> | null>=>{
  const { page, limit, sortBy, sortOrder } = paginationOptions;
  const { searchTerm, ...filters } = filter;


  const paginate = calculatePagination({ page, limit, sortBy, sortOrder });

  const andCondition = [];

  if (searchTerm) {
    andCondition.push({
      OR: offeredCourseSearchableFields.map((item) => {
        return {
          [item]: {
            contains: searchTerm,
            mode: "insensitive",
          },
        };
      }),
    });
  }

  if (Object.keys(filters).length > 0) {
    andCondition.push({
      AND: Object.keys(filters).map((field) => ({
        [field]: {
          equals: (filters as any)[field],
        },
      })),
    });
  }

  const finalConditions: Prisma.OfferedCourseWhereInput =
  andCondition.length > 0 ? { AND: andCondition } : {};


  const response = await prisma.offeredCourse.findMany({
    where: finalConditions,
    take: paginate.limit,
    skip: paginate.skip,
    orderBy:
      paginate.sortBy && paginate.sortOrder
        ? { [paginate.sortBy]: paginate.sortOrder }
        : { createdAt: "asc" },
  });
  const total = await prisma.offeredCourse.count();

  return {
    meta: {
      page: paginate.page,
      limit: paginate.limit,
      total,
    },
    data: response,
  };
}

const offeredCourse = async(id:string)=>{
  const response = await prisma.offeredCourse.findFirst({
    where:{
      id:id
    }
  })
  return response
}

const offeredCourseUpdate = async(id:string,payload:Partial<OfferedCourse>):Promise<OfferedCourse>=>{
  const response = await prisma.offeredCourse.update({
    where:{
      id:id
    },
    data:payload
  })
  return response
}

const offeredCourseDelete = async(id:string)=>{
  const response = await prisma.offeredCourse.delete({
    where:{
      id:id
    }
  })
  return response
}

export const offeredCourseService = {
  insertOfferedCourse,
  offeredCourses,
  offeredCourse,
  offeredCourseUpdate,
  offeredCourseDelete
};
