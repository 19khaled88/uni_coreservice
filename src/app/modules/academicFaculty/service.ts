import status from 'http-status'
import ApiError from '../../../errors/ApiError'
import { calculatePagination } from '../../../helpers/paginationCalculate'
import { IFilters, IPagination } from '../../../interfaces/paginationType'
import { IGenericResponse } from '../../../shared/constants'

import { IAcademicFaculty } from './interface'
import { AcademicFaculty } from './model'
import { facultySearchableFields } from './constants'

const createAcademicFaculty = async (
    data: IAcademicFaculty,
): Promise<IAcademicFaculty | null> => {
   
    const res = await AcademicFaculty.create(data)
    if (!res) {
        throw new Error('Failed to create academic faculty')
    }
    return res
}

const allFaculties = async (
    paginationOptions: IPagination,
    filter: IFilters,
): Promise<IGenericResponse<IAcademicFaculty[]> | null> => {
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
            $or: facultySearchableFields.map((item: string, index: number) => ({
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

    const res = await AcademicFaculty.find(finalConditions)
        .sort(sortCondition)
        .skip(paginate.skip)
        .limit(paginate.limit)
    const total = await AcademicFaculty.countDocuments()
    return {
        meta: {
            page: paginate.page,
            limit: paginate.limit,
            total,
        },
        data: res,
    }
}

const singleFaculty = async (id: string): Promise<IAcademicFaculty | null> => {
    const response = await AcademicFaculty.findById(id).select({ _id: 0 })
    return response
}

const updateFaculty = async (id: string, payload: Partial<IAcademicFaculty>): Promise<IAcademicFaculty | null> => {

    const isExist = await AcademicFaculty.findById(id)
    if (!isExist) {
        throw new ApiError(400, 'This Faculty not exist');
    }

    const response = await AcademicFaculty.findByIdAndUpdate(id, payload, { new: true, runValidators: true })
    return response
}

const deleteFaculty = async (id: string) => {

    const isExist = await AcademicFaculty.findById(id)
    if (!isExist) {
        throw new ApiError(400, 'This Faculty not exist');
    }

    const response = await AcademicFaculty.findByIdAndDelete(id)

    return response


}

export const academicFacultyService = {
    createAcademicFaculty,
    allFaculties,
    singleFaculty,
    updateFaculty,
    deleteFaculty
}
