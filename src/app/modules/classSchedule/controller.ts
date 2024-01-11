import { NextFunction, Request, Response } from "express";
import { classScheduleService } from "./service";
import httpStatus from "http-status";
import pick from "../../../shared/pick";
import { paginationFields } from "../../../shared/constants";
import { filterFields } from "./constants";


const create=async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const response = await classScheduleService.create(req.body)
        res.status(httpStatus.OK).json({
            success: true,
            message: 'Class schedule created successfully',
            result: response,
        })
    } catch (error) {
        next(error)
    }
}

const classSchedules = async(req:Request,res:Response,next:NextFunction)=>{

    try {
        const paginationRes = pick(req.query, paginationFields)
        const filter = pick(req.query, filterFields)
        const response = await classScheduleService.classSchedules(paginationRes,filter)
        res.status(httpStatus.OK).json({
            success: true,
            message: 'Class schedules retrieved successfully',
            result: response,
        })
    } catch (error) {
        next(error)
    }
}

const classSchedule =async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const response = await classScheduleService.classSchedule(req.params.id)
        res.status(httpStatus.OK).json({
            success: true,
            message: 'Class schedule retrieved successfully',
            result: response,
        })
    } catch (error) {
        next(error)
    }
}

const classScheduleUpdate =async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const response = await classScheduleService.classScheduleUpdate(req.params.id, req.body)
        res.status(httpStatus.OK).json({
            success: true,
            message: 'Class schedule updated successfully',
            result: response,
        })
    } catch (error) {
        next(error)
    }
}

const classScheduleDelete =async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const response = await classScheduleService.classScheduleDelete(req.params.id)
        res.status(httpStatus.OK).json({
            success: true,
            message: 'Class schedule deleted successfully',
            result: response,
        })
    } catch (error) {
        next(error)
    }
}


export const classScheduleController = {
    create,
    classSchedules,
    classSchedule,
    classScheduleUpdate,
    classScheduleDelete
}