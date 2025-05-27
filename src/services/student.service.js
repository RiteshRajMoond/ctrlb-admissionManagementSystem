import Student from "../models/Student.model.js";
import bcrypt from "bcryptjs";

class StudentService {
  async createStudent({ name, email, password }) {
    const studentExists = await this.checkStudentExists(email);
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

  async checkStudentExists(email) {
    const student = await Student.findOne({ email });
    return student ? true : false;
  }

  async getStudentByEmail(email) {
    return await Student.findOne({ email });
  }

  async getAllStudents() {
    return await Student.find();
  }
}

export default new StudentService();
