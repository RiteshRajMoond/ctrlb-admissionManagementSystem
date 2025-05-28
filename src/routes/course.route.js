import express from "express";

import { courseController } from "../controller/course.controller.js";
import adminAuthMiddleware from "../middleware/adminAuth.middleware.js";
import { courseValidation } from "../validation/course.validation.js";

const router = express.Router();

router.get("/all-courses", courseController.getAllCourses);
router.post(
  "/create-course",
  adminAuthMiddleware,
  courseValidation.createCourse(),
  courseController.createCourse
);

export default router;
