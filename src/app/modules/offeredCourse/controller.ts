import { NextFunction, Request, Response } from "express";
import { offeredCourseService } from "./service";
import httpStatus from "http-status";


const insertOfferedCourse =async(req:Request,res:Response,next:NextFunction)=>{
    
    try {
        const response = await offeredCourseService.insertOfferedCourse(req.body)
        res.status(httpStatus.OK).json({
            success: true,
            message: 'Offered course created successfully',
            result: response,
        })
    } catch (error) {
        next(error)
    }
}

export const offeredCourseController = {
    insertOfferedCourse
}