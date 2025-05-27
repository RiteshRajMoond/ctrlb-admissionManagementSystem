import Admission from "../models/Admission.model.js";
import studentService from "./student.service.js";
import courseService from "./course.service.js";

class AdmissionService {
  async applyForCourse({ studentId, courseId }) {
    const student = await studentService.getStudentById(studentId);
    if (!student) {
      throw new Error("Student not found");
    }

    const course = await courseService.getCourseById(courseId);
    if (!course) {
      throw new Error("Course not found");
    }

    const admissionExists = await this.checkAdmissionExists(
      studentId,
      courseId
    );
    if (admissionExists) {
      throw new Error(
        "Admission already exists for this student in this course"
      );
    }

    const admission = new Admission({
      student: studentId,
      course: courseId,
    });

    await admission.save();
    return admission;
  }

  async checkAdmissionExists(studentId, courseId) {
    const admission = await Admission.findOne({
      student: studentId,
      course: courseId,
    });
    return admission ? admission : null;
  }

  async getAdmissionsByStudent(studentId) {
    const student = await studentService.getStudentById(studentId);
    if (!student) {
      throw new Error("Student not found");
    }

    return await Admission.find({ student: studentId }).populate("course");
  }

  async getAdmissionsByCourse(courseId) {
    const course = await courseService.getCourseById(courseId);
    if (!course) {
      throw new Error("Course not found");
    }

    return await Admission.find({ course: courseId }).populate("student");
  }

  async updateAdmissionStatus({admissionId, status}) {
    const admission =  await this.getAdmissionById(admissionId);
    admission.status = status;
    await admission.save();
    return admission;
  }

  async getAdmissionById(admissionId) {
    const admission = await Admission.findById(admissionId).populate(
      "student course"
    );
    if (!admission) {
      throw new Error("Admission not found");
    }
    return admission ? admission : null;
  }
}

export default new AdmissionService();
