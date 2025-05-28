import studentService from "../services/student.service.js";
import catchAsync from "../util/catchAsync.js";

class StudentController {
  signUp = catchAsync(async (req, res, next) => {
    const { name, email, password } = req.body;

    const student = await studentService.createStudent({
      name,
      email,
      password,
    });
    return res.status(201).json({
      message: "Student created Successfully",
      student: {
        id: student._id,
        name: student.name,
      },
    });
  });

  login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    const jwtToken = await studentService.login({ email, password });

    res.status(200).json({
      message: "logged in successfully",
      jwtToken,
    });
  });
}

export const studentController = new StudentController();
