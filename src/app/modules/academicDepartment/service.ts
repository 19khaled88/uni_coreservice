import status from 'http-status'
import ApiError from '../../../errors/ApiError'
import { calculatePagination } from '../../../helpers/paginationCalculate'
import { IFilters, IPagination } from '../../../interfaces/paginationType'
import { IGenericResponse } from '../../../shared/constants'

import { IAcademicDepartment,  } from './interface'
import { AcademicDepartment } from './model'
import { departmentSearchableFields } from './constants'

const createAcademicDepartment = async (
    data: IAcademicDepartment,
): Promise<IAcademicDepartment | null> => {
   
    const res = await AcademicDepartment.create(data)
    if (!res) {
        throw new Error('Failed to create academic department')
    }
    return res
}

const allDepartments = async (
    paginationOptions: IPagination,
    filter: IFilters,
): Promise<IGenericResponse<IAcademicDepartment[]> | null> => {
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
            $or: departmentSearchableFields.map((item: string, index: number) => ({
                [item]: {
                    $regex: searchTerm,
                    $options: 'i'
                }
            }))
        })
    }

    if (Object.keys(filters).length) {
        andCondition.push({
            $and: Object.entries(filters).map(([field, value]) => ({
                [field]: value
            }))
        })
    }

    const finalConditions = andCondition.length > 0 ? { $and: andCondition } : {}

    const sortCondition: { [key: string | number]: any } = {}

    if (paginate.sortBy && paginate.sortOrder) {
        sortCondition[paginate.sortBy] = paginate.sortOrder
    }

    const res = await AcademicDepartment.find(finalConditions)
        .sort(sortCondition)
        .skip(paginate.skip)
        .limit(paginate.limit)
        .populate('academicFaculty')
    const total = await AcademicDepartment.countDocuments()
    return {
        meta: {
            page: paginate.page,
            limit: paginate.limit,
            total,
        },
        data: res,
    }
}

const singleDepartment = async (id: string): Promise<IAcademicDepartment | null> => {
    const response = await AcademicDepartment.findById(id).select({ _id: 0 }).populate('academicFaculty')
    return response
}

const updateDepartment = async (id: string, payload: Partial<IAcademicDepartment>): Promise<IAcademicDepartment | null> => {

    const isExist = await AcademicDepartment.findById(id)
    if (!isExist) {
        throw new ApiError(400, 'This department not exist');
    }

    const response = await AcademicDepartment.findByIdAndUpdate(id, payload, { new: true, runValidators: true })
    return response
}

const deleteDepartment = async (id: string) => {

    const isExist = await AcademicDepartment.findById(id)
    if (!isExist) {
        throw new ApiError(400, 'This department not exist');
    }

    const response = await AcademicDepartment.findByIdAndDelete(id)

    return response


}
export const academicDepartmentService = {
    createAcademicDepartment,
    allDepartments,
    singleDepartment,
    updateDepartment,
    deleteDepartment
}
