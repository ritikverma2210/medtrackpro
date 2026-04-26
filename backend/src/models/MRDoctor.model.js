import mongoose from "mongoose";

const mrDoctorSchema = new mongoose.Schema(
  {
    mr: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MR",
      required: true
    },

    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true
    }
  },
  { timestamps: true }
);

const MRDoctor = mongoose.model("MRDoctor", mrDoctorSchema);

export default MRDoctor;
