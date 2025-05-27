import Student from "../models/Student.model.js";
import { config } from "../config/index.js";

import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

class StudentService {
  async createStudent({ name, email, password }) {
    const studentExists = await this.getStudentByEmail(email);
    if (studentExists) {
      throw new Error("Student with this email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const student = new Student({
      name,
      email,
      password: hashedPassword,
    });

    await student.save();
    return student;
  }

  async login({ email, password }) {
    const student = await this.getStudentByEmail(email);
    if (!student) {
      throw new Error("Student not found");
    }

    const isPasswordValid = await bcrypt.compare(password, student.password);
    if (!isPasswordValid) {
      throw new Error("Invalid Password");
    }

    const jwtToken = jwt.sign(
      {
        id: student._id,
        type: "student",
      },
      config.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    return jwtToken;
  }

  async getStudentByEmail(email) {
    const student = await Student.findOne({ email });
    return student ? student : null;
  }

  async getStudentById(id) {
    const student = await Student.findById(id);
    return student ? student : null;
  }

  async getAllStudents() {
    return await Student.find();
  }
}

export default new StudentService();
