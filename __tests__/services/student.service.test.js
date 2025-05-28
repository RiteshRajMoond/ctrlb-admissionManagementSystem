import studentService from "../../src/services/student.service.js";
import { describe, expect, it } from "@jest/globals";

describe("Student Service Tests", () => {
  describe("createStudent", () => {
    it("should create a student with hashed password", async () => {
      const student = await studentService.createStudent({
        name: "John Doe",
        email: "johndoe@gmail.com",
        password: "password123",
      });

      expect(student).toHaveProperty("_id");
      expect(student.name).toBe("John Doe");
      expect(student.email).toBe("johndoe@gmail.com");

      const rawPassword = student.password;
      expect(rawPassword).not.toBe("password123");
    });

    it("should throw an error if email already exists", async () => {
      await studentService.createStudent({
        name: "joe",
        email: "joe@mail.com",
        password: "password123",
      });

      await expect(
        studentService.createStudent({
          name: "joe",
          email: "joe@mail.com",
          password: "password123",
        })
      ).rejects.toThrow("Student with this email already exists");
    });
  });

  describe("login", () => {
    it("should return JWT if email and password are correct", async () => {
      await studentService.createStudent({
        name: "joe",
        email: "test@test.com",
        password: "password123",
      });

      const token = await studentService.login({
        email: "test@test.com",
        password: "password123",
      });

      expect(token).toBeDefined();
      expect(typeof token).toBe("string");
    });

    it("should throw an error if email already exists", async () => {
      await expect(
        studentService.login({
          email: "newEmail@test.com",
          password: "password123",
        })
      ).rejects.toThrow("Student not found");
    });

    it("should throw an error if password is incorrect", async () => {
      await studentService.createStudent({
        name: "test",
        email: "test@test.com",
        password: "password123",
      });

      await expect(
        studentService.login({
          email: "test@test.com",
          password: "wrongPassword",
        })
      ).rejects.toThrow("Invalid Password");
    });
  });

  describe("getStudentByEmail", () => {
    it("should return student by email", async () => {
      await studentService.createStudent({
        name: "test",
        email: "test@test.com",
        password: "password123",
      });

      const student = await studentService.getStudentByEmail("test@test.com");

      expect(student).toBeDefined();
      expect(student.email).toBe("test@test.com");
    });
  });

  describe("getAllStudents", () => {
    it("should return all students", async () => {
      await studentService.createStudent({
        name: "test1",
        email: "test1@test.com",
        password: "password123",
      });

      await studentService.createStudent({
        name: "test2",
        email: "test2@test.com",
        password: "password123",
      });

      const students = await studentService.getAllStudents();
      expect(students).toBeDefined();
      expect(students.length).toBe(2);
    });
  });
});
