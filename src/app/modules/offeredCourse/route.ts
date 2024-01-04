
import express from 'express'
import { offeredCourseController } from './controller'
import validateRequest from '../../middleware/validateRequest'
import { OfferedCourseZodValidation } from './validation'


const router = express.Router()


router.post('/create',validateRequest(OfferedCourseZodValidation.createZodValidation),offeredCourseController.insertOfferedCourse)

export default router 