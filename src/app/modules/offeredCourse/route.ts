
import express from 'express'
import { offeredCourseController } from './controller'
import validateRequest from '../../middleware/validateRequest'
import { OfferedCourseZodValidation } from './validation'


const router = express.Router()


router.get('/single/:id',offeredCourseController.offeredCourse)
router.patch('/update/:id',offeredCourseController.offeredCourseUpdate)
router.delete('/delete/:id',offeredCourseController.offeredCourseDelete)
router.post('/create',validateRequest(OfferedCourseZodValidation.createZodValidation),offeredCourseController.insertOfferedCourse)
router.get('/all',offeredCourseController.offeredCourses)
export default router 