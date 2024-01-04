import { NextFunction, Request, Response } from 'express'
import { paginationFields } from '../../../shared/constants'
import pick from '../../../shared/pick'
import { buildingService } from './service'
import { filterFields } from './constants'
import httpStatus from 'http-status'


const createBuilding = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {   
        const response = await buildingService.createBuilding(
            req.body,
        )
        res.status(httpStatus.OK).json({
            success: true,
            message: 'Successfully created building',
            result: response,
        })
        // next()
    } catch (error: any) {
        next(error)
    }
}

const allBuildings = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const paginationRes = pick(req.query, paginationFields)
        const filter = pick(req.query, filterFields)
       
        const response = await buildingService.allBuildings(
            paginationRes,
            filter,
        )
        res.status(httpStatus.OK).json({
            success: true,
            message: 'Successfully Retrieved building',
            meta: response?.meta,
            result: response?.data,
        })
        // next()
    } catch (error: any) {
        next(error)
    }
}

const singleBuilding = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const response = await buildingService.singleBuilding(req.params.id)
        if (response != null) {
            res.status(200).json({
                success: true,
                message: 'Single building retrieved',
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

const updateBuilding = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const response = await buildingService.updateBuilding(
            req.params.id,
            req.body,
        )
        if (response != null) {
            res.status(200).json({
                success: true,
                message: 'building updated successfully for given ID',
                data: response,
            })
        }
        res.status(httpStatus.NOT_FOUND).json({
            success: false,
            message: 'Building not updated!!',
            data: null,
        })
    } catch (error) {
        next(error)
    }
}

const deleteBuilding = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const response = await buildingService.deleteBuilding(req.params.id)
        
        if (response != null) {
            res.status(200).json({
                success: true,
                message: 'Building deleted successfully for given ID',
                data: response,
            })
        } else {
            res.status(httpStatus.NOT_FOUND).json({
                success: false,
                message: 'Building not deleted',
                data: null,
            })
        }
        
    } catch (error) {
        next(error)
    }
}


export const buildingController = {
    createBuilding,
    allBuildings,
    singleBuilding,
    updateBuilding,
    deleteBuilding,
}
