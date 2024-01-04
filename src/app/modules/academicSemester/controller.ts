import { NextFunction, Request, Response } from 'express'
import { paginationFields } from '../../../shared/constants'
import pick from '../../../shared/pick'
import { academicSemesterService } from './service'
import { filterFields } from './constants'
import httpStatus from 'http-status'


const createAcademicSememster = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
       
        
        const response = await academicSemesterService.createAcademicSemester(
            req.body,
        )
        res.status(httpStatus.OK).json({
            success: true,
            message: 'Successfully created Academic semester',
            result: response,
        })
        // next()
    } catch (error: any) {
        next(error)
    }
}

const allSemesters = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const paginationRes = pick(req.query, paginationFields)
        const filter = pick(req.query, filterFields)
       
        const response = await academicSemesterService.allSemesters(
            paginationRes,
            filter,
        )
        res.status(httpStatus.OK).json({
            success: true,
            message: 'Successfully Retrieve Academic semesters',
            meta: response?.meta,
            result: response?.data,
        })
        // next()
    } catch (error: any) {
        next(error)
    }
}

const singleSemester = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const response = await academicSemesterService.singleSemester(req.params.id)
        if (response != null) {
            res.status(200).json({
                success: true,
                message: 'Single semester retrieved',
                data: response,
            })
        }
        res.status(httpStatus.NOT_FOUND).json({
            success: false,
            message: 'Data not found',
            data: null,
        })
    } catch (error) {
        next(error)
    }
}

const updateSemester = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const response = await academicSemesterService.updateSemester(
            req.params.id,
            req.body,
        )
        if (response != null) {
            res.status(200).json({
                success: true,
                message: 'Semester updated successfully for given ID',
                data: response,
            })
        }
        res.status(httpStatus.NOT_FOUND).json({
            success: false,
            message: 'Semester not updated!!',
            data: null,
        })
    } catch (error) {
        next(error)
    }
}

const deleteSemester = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const response = await academicSemesterService.deleteSemester(req.params.id)
        
        if (response != null) {
            res.status(200).json({
                success: true,
                message: 'Semester deleted successfully for given ID',
                data: response,
            })
        } else {
            res.status(httpStatus.NOT_FOUND).json({
                success: false,
                message: 'Semester not deleted',
                data: null,
            })
        }
        
    } catch (error) {
        next(error)
    }
}


export const academicSemesterController = {
    createAcademicSememster,
    allSemesters,
    singleSemester,
    updateSemester,
    deleteSemester,
}
