import status from "http-status";
import { PrismaClient, Prisma, Room } from "@prisma/client";
import ApiError from "../../../errors/ApiError";
import { calculatePagination } from "../../../helpers/paginationCalculate";
import { IFilters, IPagination } from "../../../interfaces/paginationType";
import { IGenericResponse } from "../../../shared/constants";
import { roomSearchableFields } from "./constants";

// import { AcademicSemester } from './model'

const prisma = new PrismaClient();

const createRoom = async (data: Room): Promise<Room | null> => {
  const checkIfExist = await prisma.room.findFirst({
    where: {
      AND: [{ roomNumber: data.roomNumber }, { floor: data.floor }],
    },
  });
  if (checkIfExist) {
    throw new ApiError(400, "Already posted same room");
  }

  const res = await prisma.room.create({ data });

  if (!res) {
    throw new Error("Failed to create room");
  }
  return res;
};

const allrooms = async (
  paginationOptions: IPagination,
  filter: IFilters
): Promise<IGenericResponse<Room[]> | null> => {
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
      OR: roomSearchableFields.map((item) => {
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

  const finalConditions: Prisma.RoomWhereInput =
    andCondition.length > 0 ? { AND: andCondition } : {};

  const res = await prisma.room.findMany({
    where: finalConditions,
    take: paginate.limit,
    skip: paginate.skip,
    orderBy:
      paginate.sortBy && paginate.sortOrder
        ? { [paginate.sortBy]: paginate.sortOrder }
        : { createdAt: "asc" },
  });

  const total = await prisma.room.count();
  
  return {
    meta: {
      page: paginate.page,
      limit: paginate.limit,
      total,
    },
    data: res,
  };
};

const singleRoom = async (
  id: string
): Promise<Partial<Room> | null> => {
  const response = await prisma.room.findFirst({
    where: {
      id: id,
    },
    select: {
     floor:true,
     roomNumber:true
    },
  });
  return response;
};

const updateRoom = async (
  id: string,
  payload: Partial<Room>
): Promise<Room | null> => {
  const isExist = await prisma.room.findFirst({
    where: {
      id: id,
    },
  });
  if (!isExist) {
    throw new ApiError(400, "This room not exist");
  }


  const response = await prisma.room.update({
    where: {
      id: id,
    },
    data: payload,
  });

  return response;
};

const deleteRoom = async (id: string) => {
  const isExist = await prisma.room.findFirst({
    where: {
      id: id,
    },
  });
  if (!isExist) {
    throw new ApiError(400, "This room not exist");
  }

  const response = await prisma.room.delete({
    where: {
      id: id,
    },
  });

  return response;
};

export const roomService = {
  createRoom,
  allrooms,
  singleRoom,
  updateRoom,
  deleteRoom
};
