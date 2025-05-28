import admissionService from "../services/admission.service.js";
import catchAsync from "../util/catchAsync.js";

class AdmissionController {
  applyForAdmission = catchAsync(async (req, res, next) => {
    const { studentId, courseId } = req.body;

    const admission = await admissionService.applyForCourse({
      studentId,
      courseId,
    });

    res.status(201).json({
      message: "Admission applied successfully",
      admission,
    });
  });

  getAdmissionsByStudent = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const admissions = await admissionService.getAdmissionsByStudent(id);
    res.status(200).json({ admissions });
  });

  getAdmissionsByCourse = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const admissions = await admissionService.getAdmissionsByCourse(id);
    res.status(200).json({ admissions });
  });

  updateAdmissionStatus = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const { status } = req.body;

    const updatedAdmission = await admissionService.updateAdmissionStatus({
      admissionId: id,
      status,
    });
    res.status(200).json({
      message: "Admission status updated successfully",
      updatedAdmission,
    });
  });
}

export const admissionController = new AdmissionController();
