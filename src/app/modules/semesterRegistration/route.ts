
import express from 'express'
import { semesterRegisterController } from './controller'
import { RegisterSemesterZodValidation } from './validation'
import validateRequest from '../../middleware/validateRequest'

const router = express.Router()

router.patch('/update-registered-semesters/:id',semesterRegisterController.updateRegisteredSemester)
router.delete('/delete-registered-semesters/:id',semesterRegisterController.deleteRegisteredSemester)
router.post('/register',validateRequest(RegisterSemesterZodValidation.createSemesterZodSchema),semesterRegisterController.registerSemester)
router.get('/all-registered-semesters',semesterRegisterController.allRegisteredSemester)
export default router 