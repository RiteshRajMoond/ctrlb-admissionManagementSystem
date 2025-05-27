import mongoose from "mongoose";

const admissionSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    status: {
      type: String,
      enum: ["enrolled", "pending", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

admissionSchema.index({ student: 1, course: 1 }, { unique: true });

const Admission = mongoose.model("Admission", admissionSchema);
export default Admission;
