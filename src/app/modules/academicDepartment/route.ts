import express from 'express'
import validateRequest from '../../middleware/validateRequest'
import { academicDepartmentController } from './controller'
import { AcademicDepartmentZodValidation } from './validation'

const router = express()

router.get('/single-department/:id', academicDepartmentController.singleDepartment)
router.put(
  '/update-department/:id',
  validateRequest(AcademicDepartmentZodValidation.updateDepartmentZodSchema),
  academicDepartmentController.updateDepartment,
)
router.delete('/delete-department/:id', academicDepartmentController.deleteDepartment)
router.post(
  '/create-ac-department',
  validateRequest(AcademicDepartmentZodValidation.createDepartmentZodSchema),
  academicDepartmentController.createAcademicDepartment,
)

router.get('/all-departments', academicDepartmentController.allDepartments)

export default router
