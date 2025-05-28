import { describe, expect } from "@jest/globals";

import adminService from "../../src/services/admin.service.js";

const dummyAdmin = {
  name: "admin",
  email: "admin@test.com",
  password: "admin123",
};

describe("Admin Service Tests", () => {
  describe("createAdmin", () => {
    it("should create a new admin with hashed password", async () => {
      const admin = await adminService.createAdmin(dummyAdmin);

      expect(admin).toHaveProperty("_id");
      expect(admin.name).toBe(dummyAdmin.name);
      expect(admin.email).toBe(dummyAdmin.email);
      expect(admin.password).not.toBe(dummyAdmin.password);
    });

    it("should throw an error if admin already exists", async () => {
      await adminService.createAdmin(dummyAdmin);
      await expect(adminService.createAdmin(dummyAdmin)).rejects.toThrow(
        "Admin with this email already exists"
      );
    });
  });

  describe("login", () => {
    it("should return JWT if email and password are correct", async () => {
      await adminService.createAdmin(dummyAdmin);

      const token = await adminService.login({
        email: dummyAdmin.email,
        password: dummyAdmin.password,
      });

      expect(token).toBeDefined();
      expect(typeof token).toBe("string");
    });

    it("should throw an error if email does not exist", async () => {
      await expect(
        adminService.login({
          email: dummyAdmin.email,
          password: dummyAdmin.password,
        })
      ).rejects.toThrow("Admin with this email does not exist");
    });

    it("should throw an error if password is incorrect", async () => {
      await adminService.createAdmin(dummyAdmin);

      await expect(
        adminService.login({
          email: dummyAdmin.email,
          password: "wrongpassword",
        })
      ).rejects.toThrow("Invalid Password");
    });
  });

  describe("findAdminWithEmail", () => {
    it("should return admin by email", async () => {
      await adminService.createAdmin(dummyAdmin);
      const admin = await adminService.findAdminWithEmail(dummyAdmin.email);

      expect(admin).toBeDefined();
      expect(admin.email).toBe(dummyAdmin.email);
    });
  });

  describe("getAdminById", () => {
    it("should return admin By Id", async () => {
      const admin = await adminService.createAdmin(dummyAdmin);
      const foundAdmin = await adminService.getAdminById(admin._id);

      expect(foundAdmin).toBeDefined();
      expect(foundAdmin._id.toString()).toBe(admin._id.toString());
      expect(foundAdmin.email).toBe(dummyAdmin.email);
    });
  });
});
