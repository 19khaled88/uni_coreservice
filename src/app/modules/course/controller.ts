import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { courseService } from "./service";

const createCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await courseService.createCourse(req.body);

    res.status(httpStatus.OK).json({
      success: true,
      message: "Successfully created Corse",
      result: response,
    });
  } catch (error) {
    next(error);
  }
};

const courseAssignToFaculty = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await courseService.courseAssignToFaculty(
      req.params.courseId,
      req.body.faculties
    );
    res.status(httpStatus.OK).json({
      success: true,
      message: "Successfully assigned course to faculty or faculties",
      result: response,
    });
  } catch (error) {
    next(error);
  }
};

const deleteAssignedCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await courseService.deleteAssignedCourse(
      req.params.courseId,
      req.body.faculties
    );
    res.status(httpStatus.OK).json({
      success: true,
      message: "Successfully deleted assigned course",
      result: response,
    });
  } catch (error) {
    next(error);
  }
};

export const courseController = {
  createCourse,
  courseAssignToFaculty,
  deleteAssignedCourse,
};
