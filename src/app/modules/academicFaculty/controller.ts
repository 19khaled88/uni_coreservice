import { NextFunction, Request, Response } from 'express'
import { paginationFields } from '../../../shared/constants'
import pick from '../../../shared/pick'
import { academicFacultyService } from './service'
import status from 'http-status'
import { filterFields } from './constants'

const createAcademicFaculty = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const response = await academicFacultyService.createAcademicFaculty(
            req.body,
        )
        res.status(200).json({
            success: true,
            message: 'Successfully created Academic faculty',
            result: response,
        })
        // next()
    } catch (error: any) {
        next(error)
    }
}

const allFaculties = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // const paginationOptions = {
        //     page: Number(req.query.page),
        //     limit: Number(req.query.limit),
        //     sortBy: req.query.sortBy?.toString(),
        //     sortOrder: req.query.sortOrder?.toString(),
        // }

        // const paginationRes = await pagenationElement(req)

        const paginationRes = pick(req.query, paginationFields)
        const filter = pick(req.query, filterFields)

        const response = await academicFacultyService.allFaculties(
            paginationRes,
            filter,
        )
        res.status(200).json({
            success: true,
            message: 'Successfully Retrieved Academic faculties',
            meta: response?.meta,
            result: response?.data,
        })
        // next()
    } catch (error: any) {
        next(error)
    }
}

const singleFaculty = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const response = await academicFacultyService.singleFaculty(req.params.id)
        if (response != null) {
            res.status(200).json({
                success: true,
                message: 'Single faculty retrieved',
                data: response,
            })
        }
        res.status(status.NOT_FOUND).json({
            success: false,
            message: 'Data not found',
            data: null,
        })
    } catch (error) {
        next(error)
    }
}

const updateFaculty = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const response = await academicFacultyService.updateFaculty(
            req.params.id,
            req.body,
        )
        if (response != null) {
            res.status(200).json({
                success: true,
                message: 'Faculty updated successfully for given ID',
                data: response,
            })
        }
        res.status(status.NOT_FOUND).json({
            success: false,
            message: 'Faculty not updated!!',
            data: null,
        })
    } catch (error) {
        next(error)
    }
}

const deleteFaculty = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const response = await academicFacultyService.deleteFaculty(req.params.id)
        
        if (response != null) {
            res.status(200).json({
                success: true,
                message: 'Faculty deleted successfully for given ID',
                data: response,
            })
        } else {
            res.status(status.NOT_FOUND).json({
                success: false,
                message: 'Faculty not deleted',
                data: null,
            })
        }
        
    } catch (error) {
        next(error)
    }
}


export const academicFacultyController = {
    createAcademicFaculty,
    allFaculties,
    singleFaculty,
    updateFaculty,
    deleteFaculty,
}
