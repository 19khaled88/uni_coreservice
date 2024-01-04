import { NextFunction, Request, Response } from 'express'
import { paginationFields } from '../../../shared/constants'
import pick from '../../../shared/pick'
import { facultyService } from './service'
import { filterFields } from './constants'
import httpStatus from 'http-status'


const createFaculty = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
       
        
        const response = await facultyService.createFaculty(
            req.body,
        )
        res.status(httpStatus.OK).json({
            success: true,
            message: 'Successfully created Faculty',
            result: response,
        })
        // next()
    } catch (error: any) {
        next(error)
    }
}

const allFaculties = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const paginationRes = pick(req.query, paginationFields)
        const filter = pick(req.query, filterFields)
       
        const response = await facultyService.allFaculties(
            paginationRes,
            filter,
        )
        res.status(httpStatus.OK).json({
            success: true,
            message: 'Successfully Retrieved Faculty',
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
        const response = await facultyService.singleFaculty(req.params.id)
        if (response != null) {
            res.status(200).json({
                success: true,
                message: 'Single Faculty retrieved',
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

const updateFaculty = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const response = await facultyService.updateFaculty(
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
        res.status(httpStatus.NOT_FOUND).json({
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
        const response = await facultyService.deleteFaculty(req.params.id)
        
        if (response != null) {
            res.status(200).json({
                success: true,
                message: 'Faculty deleted successfully for given ID',
                data: response,
            })
        } else {
            res.status(httpStatus.NOT_FOUND).json({
                success: false,
                message: 'Faculty not deleted',
                data: null,
            })
        }
        
    } catch (error) {
        next(error)
    }
}


const facultyAssignToCourse=async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const response = await facultyService.assignFacultyToCourse(req.params.facultyId, req.body.courses)
    res.status(httpStatus.OK).json({
        success: true,
        message: 'Successfully assigned faculty to course or courses',
        result: response,
    })
    } catch (error) {
        next(error)
    }
}

const deleteAssignedfaculty=async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const response = await facultyService.deleteAssignedfaculty(req.params.facultyId, req.body.courses)
    res.status(httpStatus.OK).json({
        success: true,
        message: 'Successfully deleted assigned faculty',
        result: response,
    })
    } catch (error) {
        next(error)
    }
}

export const facultyController = {
    createFaculty,
    allFaculties,
    singleFaculty,
    updateFaculty,
    deleteFaculty,
    facultyAssignToCourse,
    deleteAssignedfaculty
}
