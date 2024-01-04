import status from "http-status";
import { PrismaClient, Prisma, Student } from "@prisma/client";
import ApiError from "../../../errors/ApiError";
import { calculatePagination } from "../../../helpers/paginationCalculate";
import { IFilters, IPagination } from "../../../interfaces/paginationType";
import { IGenericResponse } from "../../../shared/constants";
import { studentSearchableFields } from "./constants";

// import { AcademicSemester } from './model'

const prisma = new PrismaClient();

const createStudent = async (data: Student): Promise<Student | null> => {
  const ifExist = await prisma.student.findFirst({
    where: {
      studentId: data.studentId,
    },
  });

  if (ifExist) {
    throw new ApiError(400, "This student already exist");
  }

  const res = await prisma.student.create({ data });

  if (!res) {
    throw new Error("Failed to create student");
  }
  return res;
};

const allStudents = async (
  paginationOptions: IPagination,
  filter: IFilters
): Promise<IGenericResponse<Student[]> | null> => {
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
      OR: studentSearchableFields.map((item) => {
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

  const finalConditions: Prisma.StudentWhereInput =
    andCondition.length > 0 ? { AND: andCondition } : {};

  const res = await prisma.student.findMany({
    where: finalConditions,
    take: paginate.limit,
    skip: paginate.skip,
    orderBy:
      paginate.sortBy && paginate.sortOrder
        ? { [paginate.sortBy]: paginate.sortOrder }
        : { createdAt: "asc" },
  });

  const total = await prisma.student.count();
  return {
    meta: {
      page: paginate.page,
      limit: paginate.limit,
      total,
    },
    data: res,
  };
};

const singleStudent = async (id: string): Promise<Partial<Student> | null> => {
  const response = await prisma.student.findFirst({
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
      academicSemesterId: true,
      academicDepartment: true,
      academicFaculty: true,
      academicSemester: true,
    },
  });
  return response;
};

const updatStudent = async (
  id: string,
  payload: Partial<Student>
): Promise<Student | null> => {
  const isExist = await prisma.student.findFirst({
    where: {
      studentId: payload.studentId,
    },
  });

  if (isExist) {
    throw new ApiError(400, "This Student already exist");
  }

  const response = await prisma.student.update({
    where: {
      id: id,
    },
    data: payload,
  });

  return response;
};

const deleteStudent = async (id: string) => {
  const isExist = await prisma.student.findFirst({
    where: {
      id: id,
    },
  });
  if (!isExist) {
    throw new ApiError(400, "This Student not exist");
  }

  const response = await prisma.student.delete({
    where: {
      id: id,
    },
  });

  return response;
};

export const studentService = {
  createStudent,
  allStudents,
  singleStudent,
  updatStudent,
  deleteStudent,
};
