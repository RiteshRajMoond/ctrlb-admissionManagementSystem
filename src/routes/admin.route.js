import express from "express";

import { adminController } from "../controller/admin.controller.js";

const router = express.Router();

router.post("/signup", adminController.signup);
router.post("/login", adminController.login);

export default router;