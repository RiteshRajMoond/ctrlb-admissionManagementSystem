import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import Admin from "../models/Admin.model.js";
import { config } from "../config/index.js";

class AdminService {
  async createAdmin({ name, email, password }) {
    const adminExists = await this.findAdminWithEmail(email);
    if (adminExists !== null) {
      throw new Error("Admin with this email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new Admin({
      name,
      email,
      password: hashedPassword,
    });

    await admin.save();
    return admin;
  }

  async login({ email, password }) {
    const admin = await this.findAdminWithEmail(email);
    if (admin === null) {
      throw new Error("Admin with this email does not exist");
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      throw new Error("Invalid Password");
    }

    const jwtToken = jwt.sign(
      {
        id: admin._id,
        type: "admin",
      },
      config.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    return jwtToken;
  }

  async findAdminWithEmail(email) {
    const admin = await Admin.findOne({ email });
    return admin ? admin : null;
  }

  async getAdminById(id) {
    const admin = await Admin.findById(id);
    return admin ? admin : null;
  }
}

export default new AdminService();