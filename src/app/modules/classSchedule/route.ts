import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { classScheduleController } from "./controller";
import { ClassScheduleZodValidation } from "./validation";

const router = express();

router.get("/single/:id", classScheduleController.classSchedule);
router.delete(
  "/delete/:id",
  classScheduleController.classScheduleDelete
);
router.patch(
  "/update/:id",
  classScheduleController.classScheduleUpdate
);
router.post(
  "/create",
  validateRequest(ClassScheduleZodValidation.createZodValidation),
  classScheduleController.create
);

router.get(
  "/all",
  classScheduleController.classSchedules
);

export default router;
