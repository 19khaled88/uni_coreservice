import { NextFunction, Request, Response } from 'express'
import { paginationFields } from '../../../shared/constants'
import pick from '../../../shared/pick'
import { academicDepartmentService } from './service'
import status from 'http-status'
import { filterFields } from './constants'

const createAcademicDepartment = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const response = await academicDepartmentService.createAcademicDepartment(
      req.body,
    )
    res.status(200).json({
      success: true,
      message: 'Successfully created Academic faculty',
      result: response,
    })
    // next()
  } catch (error: any) {
    next(error)
  }
}

const allDepartments = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // const paginationOptions = {
    //     page: Number(req.query.page),
    //     limit: Number(req.query.limit),
    //     sortBy: req.query.sortBy?.toString(),
    //     sortOrder: req.query.sortOrder?.toString(),
    // }

    // const paginationRes = await pagenationElement(req)

    const paginationRes = pick(req.query, paginationFields)
    const filter = pick(req.query, filterFields)

    const response = await academicDepartmentService.allDepartments(
      paginationRes,
      filter,
    )
    res.status(200).json({
      success: true,
      message: 'Successfully Retrieved Academic departments',
      meta: response?.meta,
      result: response?.data,
    })
    // next()
  } catch (error: any) {
    next(error)
  }
}

const singleDepartment = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const response = await academicDepartmentService.singleDepartment(
      req.params.id,
    )
    if (response != null) {
      res.status(200).json({
        success: true,
        message: 'Single department retrieved',
        data: response,
      })
    } else {
      res.status(status.NOT_FOUND).json({
        success: false,
        message: 'Data not found',
        data: null,
      })
    }
  } catch (error: any) {
    next(error)
  }
}

const updateDepartment = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const response = await academicDepartmentService.updateDepartment(
      req.params.id,
      req.body,
    )
    if (response != null) {
      res.status(200).json({
        success: true,
        message: 'Department updated successfully for given ID',
        data: response,
      })
    }else{
        res.status(status.NOT_FOUND).json({
            success: false,
            message: 'Department not updated!!',
            data: null,
          })
    }
    
  } catch (error: any) {
    next(error)
  }
}

const deleteDepartment = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const response = await academicDepartmentService.deleteDepartment(
      req.params.id,
    )

    if (response != null) {
      res.status(200).json({
        success: true,
        message: 'Department deleted successfully for given ID',
        data: response,
      })
    } else {
      res.status(status.NOT_FOUND).json({
        success: false,
        message: 'Department not deleted',
        data: null,
      })
    }
  } catch (error: any) {
    next(error)
  }
}

export const academicDepartmentController = {
  createAcademicDepartment,
  allDepartments,
  singleDepartment,
  updateDepartment,
  deleteDepartment,
}
