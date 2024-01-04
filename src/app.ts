import cors from 'cors'
import express, { Application, NextFunction, Request, Response } from 'express'
import GlobalErrorHandler from './app/middleware/globalErrorHandler'

import academicSemesterRouter from './app/modules/academicSemester/route'
import academicFacultyRoute from './app/modules/academicFaculty/route'
import academicDepartmentRoute from './app/modules/academicDepartment/route'
import studentRoute from './app/modules/student/route'
import roomRoute from './app/modules/room/route'
import facultyRoute from './app/modules/faculty/route'
import buildingRoute from './app/modules/building/route'
import courseRoute from './app/modules/course/route'
import registerSemesterRoute from './app/modules/semesterRegistration/route'

import httpStatus from 'http-status'
import cookieParser from 'cookie-parser'
const app: Application = express()

app.use(cors())

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//routes
app.use('/api/v1/academicSemester',academicSemesterRouter)
app.use('/api/v1/academicFaculty',academicFacultyRoute)
app.use('/api/v1/academicDepartment',academicDepartmentRoute)
app.use('/api/v1/student',studentRoute)
app.use('/api/v1/room',roomRoute)
app.use('/api/v1/faculty',facultyRoute)
app.use('/api/v1/building',buildingRoute)
app.use('/api/v1/course',courseRoute)
app.use('/api/v1/registerSemester',registerSemesterRoute)


app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Core service for university management' })
})

//global error handler
app.use(GlobalErrorHandler)


//handle not found
app.use((req:Request,res:Response,next:NextFunction)=>{
  res.status(httpStatus.NOT_FOUND).json({
    success:false,
    message:'Not found',
    errorMessage:[{
      path:req.originalUrl,
      message:'This Page not found'
    }]
  })
  next()
})

export default app
