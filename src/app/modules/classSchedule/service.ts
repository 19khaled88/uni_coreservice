import {
  PrismaClient,
  Prisma,
  OfferedCourseClassSchedule,
} from "@prisma/client";
import { IFilters, IPagination } from "../../../interfaces/paginationType";
import { IGenericResponse } from "../../../shared/constants";
import { calculatePagination } from "../../../helpers/paginationCalculate";
import formatToHumanReadable, { classScheduleSearchableFields } from "./constants";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";

const prisma = new PrismaClient();

const create = async (
  payload: OfferedCourseClassSchedule
): Promise<OfferedCourseClassSchedule> => {
  const checkIfRoomAvailable =
    await prisma.offeredCourseClassSchedule.findFirst({
      where: {
        AND: [
          { roomId: payload.roomId },
          { dayOfWeek: payload.dayOfWeek },
          {
            OR: [
              {
                AND: [
                  { startTime: { lte: payload.startTime } },
                  { endTime: { gte: payload.startTime } },
                ],
              },
              {
                AND: [
                  { startTime: { lte: payload.endTime } },
                  { endTime: { gte: payload.endTime } },
                ],
              },
              {
                AND: [
                  { startTime: { gte: payload.startTime } },
                  { endTime: { lte: payload.endTime } },
                ],
              },
            ],
          },
        ],
      },
    });

  if (checkIfRoomAvailable) {
    throw new ApiError(httpStatus.CONFLICT, "Room is not available for this time period");
  }

  const checkIfFacultyAvailable =
    await prisma.offeredCourseClassSchedule.findFirst({
      where: {
        AND: [
          { facultyId: payload.facultyId },
          { dayOfWeek: payload.dayOfWeek },
          {
            OR: [
              {
                AND: [
                  { startTime: { lte: payload.startTime } },
                  { endTime: { gte: payload.startTime } },
                ],
              },
              {
                AND: [
                  { startTime: { lte: payload.endTime } },
                  { endTime: { gte: payload.endTime } },
                ],
              },
              {
                AND: [
                  { startTime: { gte: payload.startTime } },
                  { endTime: { lte: payload.endTime } },
                ],
              },
            ],
          },
        ],
      },
    });

  if (checkIfFacultyAvailable) {
    throw new ApiError(httpStatus.CONFLICT, "Faculty is not available for this time period");
  }

  const response = await prisma.offeredCourseClassSchedule.create({
    data: payload,
  });
  return response;
};

const classSchedules = async (
  paginationOptions: IPagination,
  filter: IFilters
): Promise<IGenericResponse<OfferedCourseClassSchedule[]> | null> => {
  const { page, limit, sortBy, sortOrder } = paginationOptions;
  const { searchTerm, ...filters } = filter;

  const paginate = calculatePagination({ page, limit, sortBy, sortOrder });

  const andCondition = [];

  if (searchTerm) {
    andCondition.push({
      OR: classScheduleSearchableFields.map((item) => {
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

  const finalConditions: Prisma.OfferedCourseClassScheduleWhereInput =
    andCondition.length > 0 ? { AND: andCondition } : {};



  const response = await prisma.offeredCourseClassSchedule.findMany({
    where: finalConditions,
    take: paginate.limit,
    skip: paginate.skip,
    orderBy:
      paginate.sortBy && paginate.sortOrder
        ? { [paginate.sortBy]: paginate.sortOrder }
        : { createdAt: "asc" }
  });

  

  const total = await prisma.offeredCourseClassSchedule.count();

  const res = response.map((item)=>({
    ...item,
    startTime:formatToHumanReadable(item.startTime),
    endTime:formatToHumanReadable(item.endTime),
   
  }))
  
  return {
    meta: {
      page: paginate.page,
      limit: paginate.limit,
      total,
    },
    data: res,
  };
};

const classSchedule = async (id: string) => {
  const response = await prisma.offeredCourseClassSchedule.findFirst({
    where: {
      id: id,
    },
  });
  return response;
};

const classScheduleUpdate = async (
  id: string,
  payload: Partial<OfferedCourseClassSchedule>
): Promise<OfferedCourseClassSchedule> => {
  const response = await prisma.offeredCourseClassSchedule.update({
    where: {
      id: id,
    },
    data: payload,
  });
  return response;
};

const classScheduleDelete = async (id: string) => {
  const response = await prisma.offeredCourseClassSchedule.delete({
    where: {
      id: id,
    },
  });
  return response;
};

export const classScheduleService = {
  create,
  classSchedule,
  classSchedules,
  classScheduleUpdate,
  classScheduleDelete,
};
