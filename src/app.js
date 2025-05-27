import express from "express";
import bodyParser from "body-parser";

import studentRoutes from "./routes/student.route.js";
import adminRoutes from "./routes/admin.route.js";
import courseRoutes from "./routes/course.route.js";
import admissionRoutes from "./routes/admission.routes.js";
import errorHandler from "./middleware/error.middleware.js";

const app = express();

const { json } = bodyParser;
app.use(json());

app.use("/api/v1/students", studentRoutes);

app.use("/api/v1/admins", adminRoutes);

app.use("/api/v1/courses", courseRoutes);

app.use("/api/v1/admissions", admissionRoutes);

app.use(errorHandler);

export default app;
