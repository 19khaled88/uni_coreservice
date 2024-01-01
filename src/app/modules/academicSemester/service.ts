import status from "http-status";
import { PrismaClient, AcademicSemester, Prisma } from "@prisma/client";
import ApiError from "../../../errors/ApiError";
import { calculatePagination } from "../../../helpers/paginationCalculate";
import { IFilters, IPagination } from "../../../interfaces/paginationType";
import { IGenericResponse } from "../../../shared/constants";
import {
  academicSearchableFields,
  academicSemesterTitleCodeMapper,
} from "./constants";

// import { AcademicSemester } from './model'

const prisma = new PrismaClient();

const createAcademicSemester = async (
  data: AcademicSemester
): Promise<AcademicSemester | null> => {
  if (academicSemesterTitleCodeMapper[data.title] != data.code) {
    throw new ApiError(
      status.CONFLICT,
      "Semester code not match the semester title requirement"
    );
  }

  const checkIfExist = await prisma.academicSemester.findFirst({
    where: {
      AND: [{ title: data.title }, { year: data.year }],
    },
  });
  if (checkIfExist) {
    throw new ApiError(400, "Already posted same semester");
  }

  const res = await prisma.academicSemester.create({ data });

  if (!res) {
    throw new Error("Failed to create academic semester");
  }
  return res;
};

const allSemesters = async (
  paginationOptions: IPagination,
  filter: IFilters
): Promise<IGenericResponse<AcademicSemester[]> | null> => {
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
      OR: academicSearchableFields.map((item) => {
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
    // andCondition.push({
    //   AND: Object.keys(filters).map((field) => ({
    //     [field]: {
    //         equals:(filters as any)[field],
    //     },
    //   })),
    // });

    andCondition.push({
      AND: Object.keys(filters).map((field) => {
        let value = (filters as any)[field];
        if (field === "year") {
          value = Number(value);
        }
        const condition = { [field]: { equals: value } };
        return condition;
      }),
    });
  }

  const finalConditions: Prisma.AcademicSemesterWhereInput =
    andCondition.length > 0 ? { AND: andCondition } : {};

  const res = await prisma.academicSemester.findMany({
    where: finalConditions,
    take: paginate.limit,
    skip: paginate.skip,
    orderBy:
      paginate.sortBy && paginate.sortOrder
        ? { [paginate.sortBy]: paginate.sortOrder }
        : { createdAt: "asc" },
  });

  const total = await prisma.academicSemester.count();
  console.log(searchTerm, filters);
  return {
    meta: {
      page: paginate.page,
      limit: paginate.limit,
      total,
    },
    data: res,
  };
};

const singleSemester = async (
  id: string
): Promise<Partial<AcademicSemester> | null> => {
  const response = await prisma.academicSemester.findFirst({
    where: {
      id: id,
    },
    select: {
      year: true,
      title: true,
      code: true,
      startMonth: true,
      endMonth: true,
    },
  });
  return response;
};

const updateSemester = async (
  id: string,
  payload: Partial<AcademicSemester>
): Promise<AcademicSemester | null> => {
  const isExist = await prisma.academicSemester.findFirst({
    where: {
      id: id,
    },
  });
  if (!isExist) {
    throw new ApiError(400, "This Semester not exist");
  }

  if (
    payload.title != undefined &&
    payload.code != undefined &&
    academicSemesterTitleCodeMapper[payload.title] !== payload.code
  ) {
    throw new ApiError(
      status.CONFLICT,
      "Semester code not match the semester year"
    );
  }

  const response = await prisma.academicSemester.update({
    where: {
      id: id,
    },
    data: payload,
  });
 
  return response;
};

const deleteSemester = async (id: string) => {
  const isExist = await prisma.academicSemester.findFirst({
    where: {
      id: id,
    },
  });
  if (!isExist) {
    throw new ApiError(400, "This Semester not exist");
  }

  const response = await prisma.academicSemester.delete({
    where: {
      id: id,
    },
  });

  return response;
};

export const academicSemesterService = {
  createAcademicSemester,
  allSemesters,
  singleSemester,
  updateSemester,
  deleteSemester,
};
