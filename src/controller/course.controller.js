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
      data: course,
    });
  });

  getAllCourses = catchAsync(async (req, res, next) => {
    const { page, limit, title, dept } = req.query;

    const allCourses = await courseService.getAllCourses({
      page: Number(page) || 1,
      limit: Number(limit) || 10,
      title: title || "",
      dept: dept || "",
    });

    return res.status(200).json({
      message: "Courses fethched",
      data: allCourses,
    });
  });
}

export const courseController = new CourseController();
