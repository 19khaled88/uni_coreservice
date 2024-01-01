import { NextFunction, Request, Response } from "express";
import ApiError from "../../errors/ApiError";
import httpStatus from "http-status";
import { tokenVerify } from "../../helpers/jwtHelper";
import config from "../../config";
import { JwtPayload, Secret } from "jsonwebtoken";

export const auth=(...requiredRoles:string[])=>async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const token = req.headers.authorization 

        if(!token){
            throw new ApiError(httpStatus.UNAUTHORIZED,'not authorized')
        }

        //verify token 
        const tokenVerified = await tokenVerify(token, config.jwt.access_token as Secret) as JwtPayload
        req.user = tokenVerified;

        if(requiredRoles.length && !requiredRoles.includes(tokenVerified.role)){
         throw new ApiError(httpStatus.FORBIDDEN,'Forbidden')   
        }
        next()
    } catch (error) {
        // throw new ApiError(httpStatus.FORBIDDEN,'Invalid token')
        next(error)
    }
}