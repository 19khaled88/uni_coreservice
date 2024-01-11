import { NextFunction, Request, Response } from "express";
import { offeredCourseSectionService } from "./service";
import httpStatus from "http-status";
import pick from "../../../shared/pick";
import { paginationFields } from "../../../shared/constants";
import { filterFields } from "./constants";


const create=async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const response = await offeredCourseSectionService.create(req.body)
        res.status(httpStatus.OK).json({
            success: true,
            message: 'Offered course section created successfully',
            result: response,
        })
    } catch (error) {
        next(error)
    }
}

const offeredCourseSections = async(req:Request,res:Response,next:NextFunction)=>{

    try {
        const paginationRes = pick(req.query, paginationFields)
        const filter = pick(req.query, filterFields)
        const response = await offeredCourseSectionService.offeredCourseSections(paginationRes,filter)
        res.status(httpStatus.OK).json({
            success: true,
            message: 'Offered course sections retrieved successfully',
            result: response,
        })
    } catch (error) {
        next(error)
    }
}

const offeredCourseSection =async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const response = await offeredCourseSectionService.offeredCourseSection(req.params.id)
        res.status(httpStatus.OK).json({
            success: true,
            message: 'Offered course section retrieved successfully',
            result: response,
        })
    } catch (error) {
        next(error)
    }
}

const offeredCourseSectionUpdate =async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const response = await offeredCourseSectionService.offeredCourseSectionUpdate(req.params.id, req.body)
        res.status(httpStatus.OK).json({
            success: true,
            message: 'Offered course section updated successfully',
            result: response,
        })
    } catch (error) {
        next(error)
    }
}

const offeredCourseSectionDelete =async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const response = await offeredCourseSectionService.offeredCourseSectionDelete(req.params.id)
        res.status(httpStatus.OK).json({
            success: true,
            message: 'Offered course section deleted successfully',
            result: response,
        })
    } catch (error) {
        next(error)
    }
}


export const offeredCourseSectionController = {
    create,
    offeredCourseSections,
    offeredCourseSection,
    offeredCourseSectionUpdate,
    offeredCourseSectionDelete
}