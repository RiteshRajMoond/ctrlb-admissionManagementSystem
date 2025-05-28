import Course from "../models/Course.model.js";

class CourseService {
  async createCourse({ title, description, department, adminId }) {
    const courseExists = await this.checkCourseExists(title);
    if (courseExists) {
      throw new Error("Course with this title already exists");
    }
    const course = new Course({
      title,
      description,
      department,
      createdBy: adminId,
    });

    await course.save();
    return course;
  }

  async checkCourseExists(title) {
    const course = await Course.findOne({ title });
    return course ? course : null;
  }

  async getCourseByTitle(title) {
    return await Course.findOne({ title });
  }

  async getCourseById(id) {
    const course = await Course.findById(id).populate(
      "createdBy",
      "name email"
    );
    return course ? course : null;
  }

  async getAllCourses({ page = 1, limit = 10, title = "", dept = "" }) {
    const query = {};
    if (title) {
      query.title = { $regex: title, $options: "i" };
    }

    if (dept) {
      query.department = { $regex: dept, $options: "i" };
    }

    const skip = (page - 1) * limit;
    const courses = await Course.find(query)
      .populate("createdBy", "name email")
      .skip(skip)
      .limit(Number(limit))
      .lean();

    const totalCourses = await Course.countDocuments(query);

    return {
      courses,
      pagination: {
        totalCourses,
        currentPage: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(totalCourses / limit),
      },
    };
  }
}

export default new CourseService();
