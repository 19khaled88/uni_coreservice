import status from "http-status";
import { PrismaClient, Prisma, Building } from "@prisma/client";
import ApiError from "../../../errors/ApiError";
import { calculatePagination } from "../../../helpers/paginationCalculate";
import { IFilters, IPagination } from "../../../interfaces/paginationType";
import { IGenericResponse } from "../../../shared/constants";
import { buildingSearchableFields } from "./constants";

// import { AcademicSemester } from './model'

const prisma = new PrismaClient();

const createBuilding = async (data: Building): Promise<Building | null> => {
  const checkIfExist = await prisma.building.findFirst({
    where: {
      title: data.title,
    },
  });
  if (checkIfExist) {
    throw new ApiError(400, "Already building already exist");
  }

  const res = await prisma.building.create({ data });

  if (!res) {
    throw new Error("Failed to create building");
  }
  return res;
};

const allBuildings = async (
  paginationOptions: IPagination,
  filter: IFilters
): Promise<IGenericResponse<Building[]> | null> => {
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
      OR: buildingSearchableFields.map((item) => {
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
            equals:(filters as any)[field],
        },
      })),
    });
  }

  const finalConditions: Prisma.BuildingWhereInput =
    andCondition.length > 0 ? { AND: andCondition } : {};

  const res = await prisma.building.findMany({
    where: finalConditions,
    take: paginate.limit,
    skip: paginate.skip,
    orderBy:
      paginate.sortBy && paginate.sortOrder
        ? { [paginate.sortBy]: paginate.sortOrder }
        : { createdAt: "asc" },
  });

  const total = await prisma.building.count();

  return {
    meta: {
      page: paginate.page,
      limit: paginate.limit,
      total,
    },
    data: res,
  };
};

const singleBuilding = async (
  id: string
): Promise<Partial<Building> | null> => {
  const response = await prisma.building.findFirst({
    where: {
      id: id,
    },
    select: {
      title: true,
      rooms:true,
      createdAt:true
    },
  });
  return response;
};

const updateBuilding = async (
  id: string,
  payload: Partial<Building>
): Promise<Building | null> => {
  const isExist = await prisma.building.findFirst({
    where: {
      id: id,
    },
  });
  if (!isExist) {
    throw new ApiError(400, "This Building not exist");
  }

  const response = await prisma.building.update({
    where: {
      id: id,
    },
    data: payload,
  });

  return response;
};

const deleteBuilding = async (id: string) => {
  const isExist = await prisma.building.findFirst({
    where: {
      id: id,
    },
  });
  if (!isExist) {
    throw new ApiError(400, "This Building not exist");
  }

  const response = await prisma.building.delete({
    where: {
      id: id,
    },
  });

  return response;
};

export const buildingService = {
  createBuilding,
  allBuildings,
  singleBuilding,
  updateBuilding,
  deleteBuilding,
};
