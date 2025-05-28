import { body } from "express-validator";
import checkValidationArray from "../middleware/checkValidationArray.middleware.js";

class CourseValidation {
  createCourse() {
    return [
      body("title")
        .trim()
        .notEmpty()
        .isString()
        .withMessage("Title is required"),
      body("description")
        .trim()
        .notEmpty()
        .isString()
        .withMessage("Description is required"),
      body("department")
        .trim()
        .notEmpty()
        .isString()
        .withMessage("Department is required"),
      checkValidationArray,
    ];
  }
}

export const courseValidation = new CourseValidation();
