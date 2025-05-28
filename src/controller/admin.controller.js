import adminService from "../services/admin.service.js";
import catchAsync from "../util/catchAsync.js";

class AdminController {
  signup = catchAsync(async (req, res, next) => {
    const { name, email, password } = req.body;

    const admin = await adminService.createAdmin({ name, email, password });
    res.status(201).json({
      message: "Admin created successfuly",
      admin: {
        id: admin._id,
        name: admin.name,
      },
    });
  });

  login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    const jwtToken = await adminService.login({ email, password });
    res.status(200).json({
      message: "Admin logged in successfully",
      jwtToken,
    });
  });
}

export const adminController = new AdminController();