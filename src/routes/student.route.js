import express from "express";

import { studentController } from "../controller/student.controller.js";
import { studentAuthValidation } from "../validation/auth.validation.js";

const router = express.Router();

router.post("/signup", studentAuthValidation.signup(), studentController.signUp);
router.post("/login", studentAuthValidation.login(), studentController.login);

export default router;