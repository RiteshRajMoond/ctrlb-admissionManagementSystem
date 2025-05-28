import { body } from "express-validator";

import checkValidationArray from "../middleware/checkValidationArray.middleware.js";

class BaseAuthValidation {
  signup() {
    return [
      body("name")
        .trim()
        .notEmpty()
        .isString()
        .withMessage("Name is required")
        .escape(),
      body("email")
        .isString()
        .normalizeEmail()
        .isEmail()
        .withMessage("Valid Email is required"),
      body("password")
        .isString()
        .trim()
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"),
      checkValidationArray,
    ];
  }

  login() {
    return [
      body("email")
        .isString()
        .normalizeEmail()
        .isEmail()
        .withMessage("Valid Email is required"),
      body("password")
        .trim()
        .isString()
        .notEmpty()
        .withMessage("Password is required"),
      checkValidationArray,
    ];
  }

  handleValidationResult(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    next();
  }
}

class AdminAuthValidation extends BaseAuthValidation {}
class StudentAuthValidation extends BaseAuthValidation {}

export const adminAuthValidation = new AdminAuthValidation();
export const studentAuthValidation = new StudentAuthValidation();
