import {Prisma,PrismaClient,AcademicDepartment} from '@prisma/client'
import ApiError from '../../../errors/ApiError'
import { calculatePagination } from '../../../helpers/paginationCalculate'
import { IFilters, IPagination } from '../../../interfaces/paginationType'
import { IGenericResponse } from '../../../shared/constants'

import { IAcademicDepartment,  } from './interface'

import { departmentSearchableFields } from './constants'

const prisma = new PrismaClient()

const createAcademicDepartment = async (
    data: AcademicDepartment,
): Promise<AcademicDepartment | null> => {
   
    const res = await prisma.academicDepartment.create({
        data:data
    })
    if (!res) {
        throw new Error('Failed to create academic department')
    }
    return res
}

const allDepartments = async (
    paginationOptions: IPagination,
    filter: IFilters,
): Promise<IGenericResponse<AcademicDepartment[]> | null> => {
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
          OR: departmentSearchableFields.map((item) => {
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

    const finalConditions:Prisma.AcademicDepartmentWhereInput = andCondition.length > 0 ? { AND: andCondition } : {}

    const sortCondition: { [key: string | number]: any } = {}

    if (paginate.sortBy && paginate.sortOrder) {
        sortCondition[paginate.sortBy] = paginate.sortOrder
    }

    const res = await prisma.academicDepartment.findMany({
        where: finalConditions,
        take: paginate.limit,
        skip: paginate.skip,
        orderBy:
          paginate.sortBy && paginate.sortOrder
            ? { [paginate.sortBy]: paginate.sortOrder }
            : { createdAt: "asc" },
      });
      const total = await prisma.academicDepartment.count();
    return {
        meta: {
            page: paginate.page,
            limit: paginate.limit,
            total,
        },
        data: res,
    }
}

const singleDepartment = async (id: string): Promise<Partial<AcademicDepartment> | null> => {
    const response = await prisma.academicDepartment.findFirst(
        {
            where:{id:id},
            select:{
                title:true,
                academicFaculty:true,
                academicFacultyId:true,
                faculties:true,
                students:true
            }
        }
        )
    
    return response
}

const updateDepartment = async (id: string, payload: Partial<AcademicDepartment>): Promise<AcademicDepartment | null> => {

    const isExist = await prisma.academicDepartment.findFirst({
        where:{
            id:id
        }
    })
    if (!isExist) {
        throw new ApiError(400, 'This department not exist');
    }

    const response = await prisma.academicDepartment.update({
        where:{
            id:id 
        },
        data:payload
    })
    return response
}

const deleteDepartment = async (id: string) => {

    const isExist = await prisma.academicDepartment.findFirst({
        where:{
            id:id
        }
    })
    if (!isExist) {
        throw new ApiError(400, 'This department not exist');
    }

    const response = await prisma.academicDepartment.delete({
        where:{
            id:id
        }
    })

    return response


}
export const academicDepartmentService = {
    createAcademicDepartment,
    allDepartments,
    singleDepartment,
    updateDepartment,
    deleteDepartment
}
