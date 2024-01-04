import express from 'express'
import validateRequest from '../../middleware/validateRequest'
import { facultyController } from './controller'
import { FacultyZodValidation } from './validation'

const router = express()

router.get('/single-faculty/:id', facultyController.singleFaculty)
router.post('/assign-to-course/:facultyId',validateRequest(FacultyZodValidation.CourseOrFacultyZodSchema),facultyController.facultyAssignToCourse)
router.delete('/delete-assigned-faculty/:facultyId',validateRequest(FacultyZodValidation.CourseOrFacultyZodSchema),facultyController.deleteAssignedfaculty)
router.put(
  '/update-faculty/:id',
  validateRequest(FacultyZodValidation.updateFacultyZodSchema),
  facultyController.updateFaculty,
)
router.delete('/delete-faculty/:id', facultyController.deleteFaculty)
router.post(
  '/create',
  validateRequest(FacultyZodValidation.createFacultyZodSchema),
  facultyController.createFaculty,
)

router.get('/all-faculties', facultyController.allFaculties)

export default router
