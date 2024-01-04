import {PrismaClient,AcademicFaculty,Prisma } from '@prisma/client'
import ApiError from '../../../errors/ApiError'
import { calculatePagination } from '../../../helpers/paginationCalculate'
import { IFilters, IPagination } from '../../../interfaces/paginationType'
import { IGenericResponse } from '../../../shared/constants'

import { IAcademicFaculty } from './interface'

import { facultySearchableFields } from './constants'

const prisma = new PrismaClient()

const createAcademicFaculty = async (
    data: AcademicFaculty,
): Promise<AcademicFaculty | null> => {

    const isExist =await prisma.academicFaculty.findFirst({
        where:{
            title:data.title
        }
    })

    if(isExist){
        throw new ApiError(400,'This faculty already exist!')
    }
   
    const res = await prisma.academicFaculty.create({
        data:data
    })
    if (!res) {
        throw new Error('Failed to create academic faculty')
    }
    return res
}

const allFaculties = async (
    paginationOptions: IPagination,
    filter: IFilters,
): Promise<IGenericResponse<AcademicFaculty[]> | null> => {
    const { page, limit, sortBy, sortOrder } = paginationOptions
    const { searchTerm, ...filters } = filter

    const paginate = calculatePagination({ page, limit, sortBy, sortOrder })

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

    const andCondition = []

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

    if (Object.keys(filters).length) {
        andCondition.push({
            AND: Object.entries(filters).map(([field, value]) => ({
                [field]: value
            }))
        })
    }

    const finalConditions:Prisma.AcademicFacultyWhereInput = andCondition.length > 0 ? { AND: andCondition } : {}

    const sortCondition: { [key: string | number]: any } = {}

    if (paginate.sortBy && paginate.sortOrder) {
        sortCondition[paginate.sortBy] = paginate.sortOrder
    }

    const res = await prisma.academicFaculty.findMany({
        where: finalConditions,
        take: paginate.limit,
        skip: paginate.skip,
        orderBy:
          paginate.sortBy && paginate.sortOrder
            ? { [paginate.sortBy]: paginate.sortOrder }
            : { createdAt: "asc" },
      });
    const total = await prisma.academicFaculty.count();

    return {
        meta: {
            page: paginate.page,
            limit: paginate.limit,
            total,
        },
        data: res,
    }
}

const singleFaculty = async (id: string): Promise<Partial<AcademicFaculty> | null> => {
    const response = await prisma.academicFaculty.findFirst({
        where:{
            id:id
        },
        select: {
            title:true,
            createdAt:true,
            updatedAt:true,
            faculties:true,
            academicDepartments:true,
            students:true
          },
    })
    return response
}

const updateFaculty = async (id: string, payload: Partial<AcademicFaculty>): Promise<AcademicFaculty | null> => {

    const isExist = await prisma.academicFaculty.findFirst({
        where:{
            id:id
        }
    })
    if (!isExist) {
        throw new ApiError(400, 'This Faculty not exist');
    }

    const response = await prisma.academicFaculty.update({
        where:{
            id:id 
        },
        data:payload
    })
    return response
}

const deleteFaculty = async (id: string) => {

    const isExist = await prisma.academicFaculty.findFirst({
        where:{
            id:id
        }
    })
    if (!isExist) {
        throw new ApiError(400, 'This Faculty not exist');
    }

    const response = await prisma.academicFaculty.delete({
        where:{
            id:id
        }
    })

    return response


}

export const academicFacultyService = {
    createAcademicFaculty,
    allFaculties,
    singleFaculty,
    updateFaculty,
    deleteFaculty
}
