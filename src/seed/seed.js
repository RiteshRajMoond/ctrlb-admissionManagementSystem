import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { config } from "../config/index.js";

import Admin from "../models/Admin.model.js";
import Student from "../models/Student.model.js";
import Course from "../models/Course.model.js";
import Admission from "../models/Admission.model.js";

const seedDatabase = async () => {
  try {
    await mongoose.connect(config.MONGO_URI);
    console.log("Connected to MongoDB");

    await Promise.all([
      Admin.deleteMany({}),
      Student.deleteMany({}),
      Course.deleteMany({}),
      Admission.deleteMany({}),
    ]);

    const hashedAdminPassword = await bcrypt.hash("admin123", 10);
    const admin = new Admin({
      name: "Admin user",
      email: "admin@ctrlb.com",
      password: hashedAdminPassword,
    });

    await admin.save();

    const studentData = [];
    for (let i = 1; i <= 5; i++) {
      const hashedStudentPassword = await bcrypt.hash(`student${i}123`, 10);
      studentData.push({
        name: `Student ${i}`,
        email: `student${i}@gmail.com`,
        password: hashedStudentPassword,
      });
    }

    const students = await Student.insertMany(studentData);

    const courseData = [
      {
        title: "Mathematics",
        description: "Advanced Mathematics Course",
        department: "Mathematics",
      },
      {
        title: "Physics",
        description: "Fundamentals of Physics",
        department: "Physics",
      },
      {
        title: "Chemistry",
        description: "Organic Chemistry Basics",
        department: "Chemistry",
      },
      {
        title: "Biology",
        description: "Introduction to Biology",
        department: "Biology",
      },
      {
        title: "Computer Science",
        description: "Introduction to Computer Science",
        department: "Computer Science",
      },
    ];

    const courses = await Course.insertMany(
      courseData.map((course) => ({
        ...course,
        createdBy: admin._id,
      }))
    );

    const admissionData = [];
    for (let i = 0; i < 3; i++) {
      admissionData.push({
        student: students[i]._id,
        course: courses[i]._id,
      });
    }

    await Admission.insertMany(admissionData);
    console.log("Database Seeded");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();