import courseService from "../../src/services/course.service.js";
import adminService from "../../src/services/admin.service.js";
import { beforeEach, expect } from "@jest/globals";

const dummyAdmin = {
  name: "admin",
  email: "admin@test.com",
  password: "admin123",
};

const dummyCourse = {
  title: "Introduction to Programming",
  description: "A beginner's course on programming concepts.",
  department: "Computer Science",
};

describe("Course Service Tests", () => {
  let admin;

  beforeEach(async () => {
    admin = await adminService.createAdmin(dummyAdmin);
  });

  describe("createCourse", () => {
    it("should create a course with valid data", async () => {
      const course = await courseService.createCourse({
        ...dummyCourse,
        adminId: admin._id,
      });

      expect(course).toHaveProperty("_id");
      expect(course.title).toBe(dummyCourse.title);
      expect(course.description).toBe(dummyCourse.description);
      expect(course.department).toBe(dummyCourse.department);
      expect(course.createdBy.toString()).toBe(admin._id.toString());
    });

    it("should throw error if course already exists", async () => {
      await courseService.createCourse({
        ...dummyCourse,
        adminId: admin._id,
      });

      await expect(
        courseService.createCourse({
          ...dummyCourse,
          adminId: admin._id,
        })
      ).rejects.toThrow("Course with this title already exists");
    });
  });

  describe("getCourseByTitle", () => {
    it("should return course by title", async () => {
      await courseService.createCourse({
        ...dummyCourse,
        adminId: admin._id,
      });

      const course = await courseService.getCourseByTitle(dummyCourse.title);

      expect(course).toBeDefined();
      expect(course.title).toBe(dummyCourse.title);
    });
  });

  describe("getCourseById", () => {
    it("should return course by ID with populated admin", async () => {
      const created = await courseService.createCourse({
        ...dummyCourse,
        adminId: admin._id,
      });

      const course = await courseService.getCourseById(created._id);

      expect(course).toBeDefined();
      expect(course.title).toBe(dummyCourse.title);
      expect(course.createdBy).toHaveProperty("name", dummyAdmin.name);
    });
  });

  describe("getAllCourses", () => {
    it("should return paginated and filtered list of courses", async () => {
      await courseService.createCourse({
        ...dummyCourse,
        adminId: admin._id,
      });

      await courseService.createCourse({
        ...dummyCourse,
        title: "Advanced Testing",
        adminId: admin._id,
      });

      const result = await courseService.getAllCourses({
        page: 1,
        limit: 1,
        title: "testing",
      });

      expect(result).toHaveProperty("courses");
      expect(result).toHaveProperty("pagination");
      expect(result.courses.length).toBe(1);
    });
  });
});
