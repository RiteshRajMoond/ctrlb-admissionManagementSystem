import express from "express";

import { adminController } from "../controller/admin.controller.js";
import { adminAuthValidation } from "../validation/auth.validation.js";

const router = express.Router();

router.post("/signup", adminAuthValidation.signup(), adminController.signup);
router.post("/login", adminAuthValidation.login(), adminController.login);

export default router;
