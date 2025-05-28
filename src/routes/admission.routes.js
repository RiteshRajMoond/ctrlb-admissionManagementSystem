import express from "express";
import { admissionController } from "../controller/admission.controller.js";
import studentAuthMiddleware from "../middleware/studentAuth.middleware.js";
import adminAuthMiddleware from "../middleware/adminAuth.middleware.js";

const router = express.Router();

router.post(
  "/apply",
  studentAuthMiddleware,
  admissionController.applyForAdmission
);

router.get(
  "/student-applied/:id",
  studentAuthMiddleware,
  admissionController.getAdmissionsByStudent
);

router.get(
  "/course-applied/:id",
  adminAuthMiddleware,
  admissionController.getAdmissionsByCourse
);

router.put(
  "/update-status/:id",
  adminAuthMiddleware,
  admissionController.updateAdmissionStatus
);

export default router;
