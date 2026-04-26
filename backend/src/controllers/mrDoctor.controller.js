import MRDoctor from "../models/MRDoctor.model.js";
import MR from "../models/MR.model.js";
import Doctor from "../models/Doctor.model.js";

/* ================= ASSIGN DOCTOR TO MR ================= */

export const assignDoctorToMR = async (req, res) => {
  try {
    const { mrId, doctorId } = req.body;

    const mr = await MR.findById(mrId);
    if (!mr) {
      return res.status(404).json({ message: "MR not found" });
    }

    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    // Prevent duplicate mapping
    const exists = await MRDoctor.findOne({
      mr: mrId,
      doctor: doctorId
    });

    if (exists) {
      return res.status(400).json({
        message: "Doctor already assigned to MR"
      });
    }

    const mapping = await MRDoctor.create({
      mr: mrId,
      doctor: doctorId
    });

    res.status(201).json({
      success: true,
      message: "Doctor assigned to MR",
      mapping
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/* ================= GET MR DOCTORS ================= */

export const getMRDoctors = async (req, res) => {
  try {
    const { mrId } = req.params;

    const doctors = await MRDoctor.find({ mr: mrId })
      .populate("doctor");

    res.json({
      success: true,
      doctors
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
