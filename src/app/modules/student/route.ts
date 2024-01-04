import express from 'express'
import validateRequest from '../../middleware/validateRequest'
import { studentController } from './controller'
import { StudentZodValidation } from './validation'

const router = express()

router.get('/single-building/:id', studentController.singleStudent)
router.put(
  '/update-building/:id',
  validateRequest(StudentZodValidation.updateStudentZodSchema),
  studentController.updateStudent,
)
router.delete('/delete-building/:id', studentController.deleteStudent)
router.post(
  '/create',
  validateRequest(StudentZodValidation.createStudentZodSchema),
  studentController.createStudent,
)

router.get('/all-buildings', studentController.allStudents)

export default router
