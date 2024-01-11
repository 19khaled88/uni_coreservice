import { NextFunction, Request, Response } from "express";
import { offeredCourseService } from "./service";
import httpStatus from "http-status";
import pick from "../../../shared/pick";
import { paginationFields } from "../../../shared/constants";
import { filterFields } from "./constants";


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

const offeredCourses = async(req:Request,res:Response,next:NextFunction)=>{

    try {
        const paginationRes = pick(req.query, paginationFields)
        const filter = pick(req.query, filterFields)
        const response = await offeredCourseService.offeredCourses(paginationRes,filter)
        res.status(httpStatus.OK).json({
            success: true,
            message: 'Offered courses retrieved successfully',
            result: response,
        })
    } catch (error) {
        next(error)
    }
}

const offeredCourse =async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const response = await offeredCourseService.offeredCourse(req.params.id)
        res.status(httpStatus.OK).json({
            success: true,
            message: 'Offered course retrieved successfully',
            result: response,
        })
    } catch (error) {
        next(error)
    }
}

const offeredCourseUpdate =async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const response = await offeredCourseService.offeredCourseUpdate(req.params.id, req.body)
        res.status(httpStatus.OK).json({
            success: true,
            message: 'Offered course updated successfully',
            result: response,
        })
    } catch (error) {
        next(error)
    }
}

const offeredCourseDelete =async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const response = await offeredCourseService.offeredCourseDelete(req.params.id)
        res.status(httpStatus.OK).json({
            success: true,
            message: 'Offered course deleted successfully',
            result: response,
        })
    } catch (error) {
        next(error)
    }
}

export const offeredCourseController = {
    insertOfferedCourse,
    offeredCourses,
    offeredCourse,
    offeredCourseUpdate,
    offeredCourseDelete
}