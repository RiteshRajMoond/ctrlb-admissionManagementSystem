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

  async getAllCourses() {
    return await Course.find().populate("createdBy", "name email");
  }
}

export default new CourseService();
