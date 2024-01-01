import express from 'express'
import validateRequest from '../../middleware/validateRequest'
import { academicFacultyController } from './controller'
import { AcademicFacultyZodValidation } from './validation'

const router = express()

router.get('/single-faculty/:id', academicFacultyController.singleFaculty)
router.put(
  '/update-faculty/:id',
  validateRequest(AcademicFacultyZodValidation.updateFacultyZodSchema),
  academicFacultyController.updateFaculty,
)
router.delete('/delete-faculty/:id', academicFacultyController.deleteFaculty)
router.post(
  '/create-ac-faculty',
  validateRequest(AcademicFacultyZodValidation.createFacultyZodSchema),
  academicFacultyController.createAcademicFaculty,
)

router.get('/all-faculties', academicFacultyController.allFaculties)

export default router
