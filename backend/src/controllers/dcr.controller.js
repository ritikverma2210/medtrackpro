import DCR from "../models/DCR.model.js";
import MR from "../models/MR.model.js";
import Visit from "../models/Visit.model.js";
import { generateDCRPdf } from "../services/pdf.service.js";

/* ================= CREATE DCR ================= */

export const createDCR = async (req, res) => {
  try {
    const { date, summaryNotes } = req.body;

    const mr = await MR.findOne({
      user: req.user._id
    });

    if (!mr) {
      return res.status(404).json({
        message: "MR not found"
      });
    }

    const start = new Date(date);
    start.setHours(0, 0, 0, 0);

    const end = new Date(date);
    end.setHours(23, 59, 59, 999);

    const visits = await Visit.find({
      mr: mr._id,
      visitDate: {
        $gte: start,
        $lte: end
      }
    });

    const dcr = await DCR.create({
      mr: mr._id,
      date,
      visits: visits.map(v => v._id),
      totalVisits: visits.length,
      summaryNotes,
      createdBy: req.user._id
    });

    res.status(201).json({
      success: true,
      dcr
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message
    });
  }
};

/* ================= ADD VISIT ================= */

export const addVisitToDCR = async (req, res) => {
  try {
    const { dcrId, visitId } = req.body;

    const dcr = await DCR.findById(dcrId);

    if (!dcr) {
      return res.status(404).json({ message: "DCR not found" });
    }

    const visit = await Visit.findById(visitId);

    if (!visit) {
      return res.status(404).json({ message: "Visit not found" });
    }

    if (visit.mr.toString() !== dcr.mr.toString()) {
      return res.status(403).json({
        message: "Visit does not belong to this MR"
      });
    }

    if (dcr.visits.includes(visitId)) {
      return res.status(400).json({
        message: "Visit already attached"
      });
    }

    dcr.visits.push(visitId);
    dcr.totalVisits = dcr.visits.length;

    await dcr.save();

    res.json({
      success: true,
      message: "Visit added",
      dcr
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

/* ================= SUBMIT ================= */

export const submitDCR = async (req, res) => {
  try {
    const { id } = req.params;

    const dcr = await DCR.findById(id);

    if (!dcr) {
      return res.status(404).json({
        message: "DCR not found"
      });
    }

    // MR validation
    if (req.user.role === "mr") {
      const mr = await MR.findOne({ user: req.user._id });

      if (!mr || dcr.mr.toString() !== mr._id.toString()) {
        return res.status(403).json({
          message: "Not allowed"
        });
      }
    }

    dcr.status = "submitted";
    dcr.submittedAt = new Date();

    await dcr.save();

    res.json({
      success: true,
      dcr
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

/* ================= REVIEW (ADMIN ONLY) ================= */

export const reviewDCR = async (req, res) => {
  try {
    const { id } = req.params;
    const { action, rejectionReason } = req.body;

    const dcr = await DCR.findById(id);

    if (!dcr) {
      return res.status(404).json({
        message: "DCR not found"
      });
    }

    if (dcr.status !== "submitted") {
      return res.status(400).json({
        message: "Only submitted DCR can be reviewed"
      });
    }

    if (action === "approve") {
      dcr.status = "approved";
      dcr.approvedAt = new Date();
      dcr.approvedBy = req.user._id;
    }

    if (action === "reject") {
      dcr.status = "rejected";
      dcr.rejectionReason = rejectionReason || "Not specified";
    }

    await dcr.save();

    res.json({
      success: true,
      dcr
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

/* ================= PDF ================= */

export const exportDCRPdf = async (req, res) => {
  try {
    const { id } = req.params;

    const dcr = await DCR.findById(id)
      .populate("mr")
      .populate({
        path: "visits",
        populate: [
          { path: "doctor" },
          { path: "productsDiscussed.product" }
        ]
      });

    if (!dcr) {
      return res.status(404).json({
        message: "DCR not found"
      });
    }

    await generateDCRPdf(dcr, res);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

/* ================= GET ALL DCR ================= */

export const getAllDCR = async (req, res) => {
  try {
    let dcrs;

    if (req.user.role === "mr") {
      const mr = await MR.findOne({
        user: req.user._id
      });

      dcrs = await DCR.find({
        mr: mr._id
      })
        .populate({
          path: "mr",
          populate: {
            path: "user",
            select: "name email"
          }
        })
        .populate("visits");

    } else {
      // ✅ ADMIN → ALL DCR देखेगा
      dcrs = await DCR.find({})
        .populate({
          path: "mr",
          populate: {
            path: "user",
            select: "name email"
          }
        })
        .populate("visits");
    }

    res.json({
      success: true,
      dcrs
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};