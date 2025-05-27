import express from "express";

import { studentController } from "../controller/student.controller.js";

const router = express.Router();

router.post("/signup", studentController.signUp);
router.post("/login", studentController.login);

export default router;