import { body, param } from "express-validator";

import checkValidationArray from "../middleware/checkValidationArray.middleware.js";

class AdmissionValidation {
  applyForAdmission() {
    return [
      body("studentId").isMongoId().withMessage("Valid Student ID is required"),
      body("courseId").isMongoId().withMessage("Valid Course ID is required"),
      checkValidationArray,
    ];
  }

  updateAdmissionStatus() {
    return [
      param("id").isMongoId().withMessage("Valid Admission ID is required"),
      body("status")
        .isIn(["pending", "enrolled", "rejected"])
        .withMessage("Status must be one of: pending, enrolled, rejected"),
      checkValidationArray,
    ];
  }

  getAdmissionsByStudent() {
    return [
      param("id").isMongoId().withMessage("Valid Student ID is required"),
      checkValidationArray,
    ];
  }

  getAdmissionsByCourse() {
    return [
      param("id").isMongoId().withMessage("Valid Course ID is required"),
      checkValidationArray,
    ];
  }
}

export const admissionValidation = new AdmissionValidation();
