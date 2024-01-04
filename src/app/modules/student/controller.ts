import { NextFunction, Request, Response } from 'express'
import { paginationFields } from '../../../shared/constants'
import pick from '../../../shared/pick'
import { studentService } from './service'
import { filterFields } from './constants'
import httpStatus from 'http-status'


const createStudent = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const response = await studentService.createStudent(
            req.body,
        )
        res.status(httpStatus.OK).json({
            success: true,
            message: 'Successfully created student',
            result: response,
        })
        // next()
    } catch (error: any) {
        next(error)
    }
}

const allStudents = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const paginationRes = pick(req.query, paginationFields)
        const filter = pick(req.query, filterFields)
       
        const response = await studentService.allStudents(
            paginationRes,
            filter,
        )
        res.status(httpStatus.OK).json({
            success: true,
            message: 'Successfully Retrieved students',
            meta: response?.meta,
            result: response?.data,
        })
        // next()
    } catch (error: any) {
        next(error)
    }
}

const singleStudent = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const response = await studentService.singleStudent(req.params.id)
        if (response != null) {
            res.status(200).json({
                success: true,
                message: 'Single student retrieved',
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

const updateStudent = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const response = await studentService.updatStudent(
            req.params.id,
            req.body,
        )
        if (response != null) {
            res.status(200).json({
                success: true,
                message: 'Student updated successfully for given ID',
                data: response,
            })
        }
        res.status(httpStatus.NOT_FOUND).json({
            success: false,
            message: 'Student not updated!!',
            data: null,
        })
    } catch (error) {
        next(error)
    }
}

const deleteStudent = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const response = await studentService.deleteStudent(req.params.id)
        
        if (response != null) {
            res.status(200).json({
                success: true,
                message: 'Student deleted successfully for given ID',
                data: response,
            })
        } else {
            res.status(httpStatus.NOT_FOUND).json({
                success: false,
                message: 'Student not deleted',
                data: null,
            })
        }
        
    } catch (error) {
        next(error)
    }
}


export const studentController = {
    createStudent,
    allStudents,
    singleStudent,
    updateStudent,
    deleteStudent,
}
