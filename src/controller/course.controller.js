import courseService from "../services/course.service.js";
import catchAsync from "../util/catchAsync.js";

class CourseController {
  createCourse = catchAsync(async (req, res, next) => {
    const { title, description, department } = req.body;
    const adminId = req.admin.id;

    const course = await courseService.createCourse({
      title,
      description,
      department,
      adminId,
    });

    return res.status(201).json({
        message: "Course created Successfully",
        data: course
    })
  });

  getAllCourses = catchAsync(async (req, res, next) => {
    const courses = await courseService.getAllCourses();
    return res.status(200).json({
        data: courses
    })
  })
}

export const courseController = new CourseController();