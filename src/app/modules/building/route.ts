import express from 'express'
import validateRequest from '../../middleware/validateRequest'
import { buildingController } from './controller'
import { BuildingZodValidation } from './validation'

const router = express()

router.get('/single-building/:id', buildingController.singleBuilding)
router.put(
  '/update-building/:id',
  validateRequest(BuildingZodValidation.updateBuildingZodSchema),
  buildingController.updateBuilding,
)
router.delete('/delete-building/:id', buildingController.deleteBuilding)
router.post(
  '/create',
  validateRequest(BuildingZodValidation.createBuildingZodSchema),
  buildingController.createBuilding,
)

router.get('/all-buildings', buildingController.allBuildings)

export default router
