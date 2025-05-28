import admissionService from "../../src/services/admission.service.js";
import studentService from "../../src/services/student.service.js";
import courseService from "../../src/services/course.service.js";
import adminService from "../../src/services/admin.service.js";
import { beforeEach } from "@jest/globals";

const dummyStudent = {
  name: "joe",
  email: "joe@gmail.com",
  password: "password123",
};

const dummyCourse = {
  title: "Introduction to Programming",
  description: "A beginner's course on programming concepts.",
  department: "Computer Science",
};

const dummyAdmin = {
  name: "admin",
  email: "admin@test.com",
  password: "admin123",
};

describe("Admin Service Tests", () => {
  let student, course, admin;

  beforeEach(async () => {
    student = await studentService.createStudent(dummyStudent);
    admin = await adminService.createAdmin(dummyAdmin);
    course = await courseService.createCourse({
      ...dummyCourse,
      adminId: admin._id,
    });
  });

  describe("applyForCourse", () => {
    it("should create a new admission for a student in a course", async () => {
      const admission = await admissionService.applyForCourse({
        studentId: student._id,
        courseId: course._id,
      });

      expect(admission).toHaveProperty("_id");
      expect(admission.student.toString()).toBe(student._id.toString());
      expect(admission.course.toString()).toBe(course._id.toString());
    });

    it("should throw error if student does not exist", async () => {
      await expect(
        admissionService.applyForCourse({
          studentId: "507f1f77bcf86cd799439011",
          courseId: course._id,
        })
      ).rejects.toThrow("Student not found");
    });

    it("should throw error if course does not exist", async () => {
      await expect(
        admissionService.applyForCourse({
          studentId: student._id,
          courseId: "507f1f77bcf86cd799439011",
        })
      ).rejects.toThrow("Course not found");
    });

    it("should throw error if admission already exists", async () => {
      await admissionService.applyForCourse({
        studentId: student._id,
        courseId: course._id,
      });

      await expect(
        admissionService.applyForCourse({
          studentId: student._id,
          courseId: course._id,
        })
      ).rejects.toThrow(
        "Admission already exists for this student in this course"
      );
    });
  });
});
