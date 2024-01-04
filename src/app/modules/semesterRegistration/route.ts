

import express from 'express'
import { semesterRegisterController } from './controller'

const router = express.Router()

router.post('/register',semesterRegisterController.registerSemester)

export default router 