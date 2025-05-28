import express from "express";

import { admissionController } from "../controller/admission.controller.js";
import studentAuthMiddleware from "../middleware/studentAuth.middleware.js";
import adminAuthMiddleware from "../middleware/adminAuth.middleware.js";
import { admissionValidation } from "../validation/admission.validation.js";

const router = express.Router();

router.post(
  "/apply",
  studentAuthMiddleware,
  admissionValidation.applyForAdmission(),
  admissionController.applyForAdmission
);

router.get(
  "/student-applied/:id",
  studentAuthMiddleware,
  admissionValidation.getAdmissionsByStudent(),
  admissionController.getAdmissionsByStudent
);

router.get(
  "/course-applied/:id",
  adminAuthMiddleware,
  admissionValidation.getAdmissionsByCourse(),
  admissionController.getAdmissionsByCourse
);

router.put(
  "/update-status/:id",
  adminAuthMiddleware,
  admissionValidation.updateAdmissionStatus(),
  admissionController.updateAdmissionStatus
);

export default router;
