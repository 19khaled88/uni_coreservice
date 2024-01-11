import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { offeredCourseSectionController } from "./controller";
import { OfferedCourseSectionZodValidation } from "./validation";

const router = express();

router.get("/single/:id", offeredCourseSectionController.offeredCourseSection);
router.delete(
  "/delete/:id",
  offeredCourseSectionController.offeredCourseSectionDelete
);
router.patch(
  "/update/:id",
  offeredCourseSectionController.offeredCourseSectionUpdate
);
router.post(
  "/create",
  validateRequest(OfferedCourseSectionZodValidation.createZodValidation),
  offeredCourseSectionController.create
);

router.get(
  "/all",
  offeredCourseSectionController.offeredCourseSections
);

export default router;
