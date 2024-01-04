import { NextFunction, Request, Response } from 'express'
import { paginationFields } from '../../../shared/constants'
import pick from '../../../shared/pick'
import { roomService } from './service'
import { filterFields } from './constants'
import httpStatus from 'http-status'


const createRoom = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
       
        
        const response = await roomService.createRoom(
            req.body,
        )
        res.status(httpStatus.OK).json({
            success: true,
            message: 'Successfully created room',
            result: response,
        })
        // next()
    } catch (error: any) {
        next(error)
    }
}

const allRooms = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const paginationRes = pick(req.query, paginationFields)
        const filter = pick(req.query, filterFields)
       
        const response = await roomService.allrooms(
            paginationRes,
            filter,
        )
        res.status(httpStatus.OK).json({
            success: true,
            message: 'Successfully Retrieved rooms',
            meta: response?.meta,
            result: response?.data,
        })
        // next()
    } catch (error: any) {
        next(error)
    }
}

const singleRoom = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const response = await roomService.singleRoom(req.params.id)
        if (response != null) {
            res.status(200).json({
                success: true,
                message: 'Single room retrieved',
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

const updateRoom = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const response = await roomService.updateRoom(
            req.params.id,
            req.body,
        )
        if (response != null) {
            res.status(200).json({
                success: true,
                message: 'Room updated successfully for given ID',
                data: response,
            })
        }
        res.status(httpStatus.NOT_FOUND).json({
            success: false,
            message: 'Room not updated!!',
            data: null,
        })
    } catch (error) {
        next(error)
    }
}

const deleteRoom = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const response = await roomService.deleteRoom(req.params.id)
        
        if (response != null) {
            res.status(200).json({
                success: true,
                message: 'Room deleted successfully for given ID',
                data: response,
            })
        } else {
            res.status(httpStatus.NOT_FOUND).json({
                success: false,
                message: 'Room not deleted',
                data: null,
            })
        }
        
    } catch (error) {
        next(error)
    }
}


export const roomController = {
    createRoom,
    allRooms,
    singleRoom,
    updateRoom,
    deleteRoom,
}
