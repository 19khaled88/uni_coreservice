import status from "http-status";
import {
  PrismaClient,
  AcademicSemester,
  Prisma,
  Faculty,
} from "@prisma/client";
import ApiError from "../../../errors/ApiError";
import { calculatePagination } from "../../../helpers/paginationCalculate";
import { IFilters, IPagination } from "../../../interfaces/paginationType";
import { IGenericResponse } from "../../../shared/constants";
import { facultySearchableFields } from "./constants";

const prisma = new PrismaClient();

const createFaculty = async (data: Faculty): Promise<Faculty | null> => {

  
  const checkIfExist = await prisma.faculty.findFirst({
    where: {
      facultyId: data.facultyId,
    },
  });
  if (checkIfExist) {
    throw new ApiError(400, "Already posted same faculty");
  }

  const res = await prisma.faculty.create({ data });

  if (!res) {
    throw new Error("Failed to create faculty");
  }
  return res;
};

const allFaculties = async (
  paginationOptions: IPagination,
  filter: IFilters
): Promise<IGenericResponse<Faculty[]> | null> => {
  const { page, limit, sortBy, sortOrder } = paginationOptions;
  const { searchTerm, ...filters } = filter;

  const paginate = calculatePagination({ page, limit, sortBy, sortOrder });

  //   const andCondition = [
  //     {
  //       $or: [
  //         {
  //           title: {
  //             $regex: searchTerm,
  //             $options: 'i',
  //           },
  //         },
  //       ],
  //     },
  //   ]

  const andCondition = [];

  if (searchTerm) {
    andCondition.push({
      OR: facultySearchableFields.map((item) => {
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

  const finalConditions: Prisma.FacultyWhereInput =
    andCondition.length > 0 ? { AND: andCondition } : {};

  const res = await prisma.faculty.findMany({
    where: finalConditions,
    take: paginate.limit,
    skip: paginate.skip,
    orderBy:
      paginate.sortBy && paginate.sortOrder
        ? { [paginate.sortBy]: paginate.sortOrder }
        : { createdAt: "asc" },
  });

  const total = await prisma.academicSemester.count();
  
  return {
    meta: {
      page: paginate.page,
      limit: paginate.limit,
      total,
    },
    data: res,
  };
};

const singleFaculty = async (id: string): Promise<Partial<Faculty> | null> => {
  const response = await prisma.faculty.findFirst({
    where: {
      id: id,
    },
    select: {
      firstName: true,
      lastName: true,
      middleName: true,
      email: true,
      gender: true,
      bloodGroup: true,
      profileImage: true,
      contactNo: true,
      academicDepartmentId: true,
      academicFacultyId: true,
      designation: true,
      facultyId: true,
      academicDepartment: true,
      academicFaculty: true,
    },
  });
  return response;
};

const updateFaculty = async (
  id: string,
  payload: Partial<Faculty>
): Promise<Faculty | null> => {
  const isExist = await prisma.faculty.findFirst({
    where: {
      facultyId:payload.facultyId
    },
  });
  if (!isExist) {
    throw new ApiError(400, "This Faculty not exist");
  }


  const response = await prisma.faculty.update({
    where: {
      id: id,
    },
    data: payload,
  });

  return response;
};

const deleteFaculty = async (id: string) => {
  const isExist = await prisma.faculty.findFirst({
    where: {
      id: id,
    },
  });
  if (!isExist) {
    throw new ApiError(400, "This Faculty not exist");
  }

  const response = await prisma.faculty.delete({
    where: {
      id: id,
    },
  });

  return response;
};

const assignFacultyToCourse=async(facultyId:string,courses:string[])=>{
  try {
    const data: Prisma.CourseFacultyCreateManyInput[] = courses.map((courseId) => ({
      courseId,
      facultyId,
    }));

    // Use createMany to insert records
   await prisma.courseFaculty.createMany({
      data,
    });

    // Fetch the created records based on the courseId and facultyIds
    const createdRecords = await prisma.courseFaculty.findMany({
      where: {
        facultyId,
        courseId: {
          in: courses,
        },
        
      },
      include:{
        faculty:true,
        course:true
      }
    });

    return createdRecords;
  } catch (error) {
    throw error;
  } 
}

const deleteAssignedfaculty =async(facultyId:string,courses:string[])=>{
  try {  
      // Use createMany to insert records
      const deleteManyResponse = await prisma.courseFaculty.deleteMany({
        where:{
          facultyId,
          courseId:{
              in:courses
          }
        }
      });

  
      // Fetch the created records based on the courseId and facultyIds
      const remaningRecords = await prisma.courseFaculty.findMany({
        where: {
          facultyId,
          courseId: {
            notIn: courses,
          },
          
        },
        include:{
          faculty:true,
          course:true
        }
      });

      return remaningRecords;
    } catch (error) {
      throw error;
    } 
}

export const facultyService = {
  createFaculty,
  allFaculties,
  singleFaculty,
  updateFaculty,
  deleteFaculty,
  assignFacultyToCourse,
  deleteAssignedfaculty
};
