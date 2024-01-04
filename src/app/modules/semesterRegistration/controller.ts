import { Request,Response,NextFunction } from "express";
import { semesterRegistrationService } from "./service";
import httpStatus from "http-status";


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

export const semesterRegisterController ={
    registerSemester
}