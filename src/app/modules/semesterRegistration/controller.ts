import { Request,Response,NextFunction } from "express";
import { semesterRegistrationService } from "./service";
import httpStatus from "http-status";
import pick from "../../../shared/pick";
import { paginationFields } from "../../../shared/constants";
import { filterFields } from "./constants";


const registerSemester = async(req: Request, res: Response, next: NextFunction)=>{
    try {
        const response = await semesterRegistrationService.registerSemester(req.body)
        res.status(httpStatus.OK).json({
            success: true,
            message: 'Semester registered successfully',
            result: response,
        })
    } catch (error) {
        next(error)
    }
}

const allRegisteredSemester =async(req: Request, res: Response, next: NextFunction)=>{
  try {
    const paginationRes = pick(req.query, paginationFields)
    const filter = pick(req.query, filterFields)
    const response = await semesterRegistrationService.getAllRegisteredSemester(paginationRes,filter)
    res.status(httpStatus.OK).json({
        success: true,
        message: 'Successfully Retrieved all registerd semesters',
        meta: response?.meta,
        result: response?.data,
    })
  } catch (error) {
    next(error)
  }
}

const deleteRegisteredSemester=async(req: Request, res: Response, next: NextFunction)=>{
   try {
    const response = await semesterRegistrationService.deleteRegistedSemester(req.params.id)
    res.status(httpStatus.OK).json({
        success: true,
        message: 'Deleted registerd semester successfully',
        result: response,
    })
   } catch (error) {
    next(error)
   }
}

const updateRegisteredSemester=async(req: Request, res: Response, next: NextFunction)=>{
    try {
        const response = await semesterRegistrationService.updateRegistedSemester(req.params.id,req.body)
        res.status(httpStatus.OK).json({
            success: true,
            message: 'Updated registerd semester successfully',
            result: response,
        })
       } catch (error) {
       
        next(error)
       }
}



export const semesterRegisterController ={
    registerSemester,
    allRegisteredSemester,
    deleteRegisteredSemester,
    updateRegisteredSemester
}