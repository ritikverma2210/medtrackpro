import Visit from "../models/Visit.model.js";
import DCR from "../models/DCR.model.js";
import MR from "../models/MR.model.js";
import ExcelJS from "exceljs";

export const getMonthlyPerformance = async (req, res) => {
  try {
    let { mrId, month, year } = req.query;

    /* ================= ROLE BASED ACCESS ================= */

    if (req.user.role === "mr") {
      const mr = await MR.findOne({ user: req.user._id });
      if (!mr) {
        return res.status(404).json({ message: "MR profile not found" });
      }
      mrId = mr._id;
    }

    if (!mrId || !month || !year) {
      return res.status(400).json({
        message: "mrId, month and year required"
      });
    }

    month = Number(month);
    year = Number(year);

    if (month < 1 || month > 12) {
      return res.status(400).json({
        message: "Invalid month"
      });
    }

    /* ================= DATE RANGE ================= */

    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59);

    /* ================= FETCH DATA ================= */

    const visits = await Visit.find({
      mr: mrId,
      visitDate: { $gte: startDate, $lte: endDate }
    }).populate("productsDiscussed.product");

    const dcrs = await DCR.find({
      mr: mrId,
      date: { $gte: startDate, $lte: endDate }
    });

    /* ================= UNIQUE DOCTORS ================= */

    const uniqueDoctors = new Set(
      visits.map(v => v.doctor.toString())
    );

    /* ================= DAILY VISIT TREND ================= */

    const daysInMonth = new Date(year, month, 0).getDate();
    const visitTrend = [];

    for (let day = 1; day <= daysInMonth; day++) {
      visitTrend.push({
        day,
        visits: 0
      });
    }

    visits.forEach(v => {
      const day = new Date(v.visitDate).getDate();
      visitTrend[day - 1].visits += 1;
    });

    /* ================= PRODUCT STATS ================= */

    const productStatsMap = {};

    visits.forEach(v => {
      v.productsDiscussed?.forEach(p => {
        const name = p.product?.name || "Unknown";
        productStatsMap[name] = (productStatsMap[name] || 0) + 1;
      });
    });

    const productStats = Object.entries(productStatsMap)
      .map(([product, count]) => ({ product, count }))
      .sort((a, b) => b.count - a.count);

    /* ================= FINAL RESPONSE ================= */

    return res.json({
      success: true,

      month,
      year,

      summary: {
        totalVisits: visits.length,
        totalDCRs: dcrs.length,
        doctorsCovered: uniqueDoctors.size,
        avgVisitsPerDay:
          visits.length > 0
            ? Number((visits.length / daysInMonth).toFixed(2))
            : 0
      },

      trends: {
        dailyVisits: visitTrend,
        topProducts: productStats
      }
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};
/* ================= YEARLY VISIT TREND ================= */

export const getYearlyVisitTrend = async (req, res) => {
  try {
    let { year, mrId } = req.query;

    if (!year) {
      return res.status(400).json({
        message: "Year is required"
      });
    }

    year = Number(year);

    /* ===== Role Based Access ===== */

    if (req.user.role === "mr") {
      const mr = await MR.findOne({ user: req.user._id });
      if (!mr) {
        return res.status(404).json({ message: "MR profile not found" });
      }
      mrId = mr._id;
    }

    if (!mrId) {
      return res.status(400).json({
        message: "mrId required"
      });
    }

    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year, 11, 31, 23, 59, 59);

    const visits = await Visit.find({
      mr: mrId,
      visitDate: { $gte: startDate, $lte: endDate }
    });

    /* ===== 12 Month Structure ===== */

    const monthlyTrend = [
      { month: "Jan", visits: 0 },
      { month: "Feb", visits: 0 },
      { month: "Mar", visits: 0 },
      { month: "Apr", visits: 0 },
      { month: "May", visits: 0 },
      { month: "Jun", visits: 0 },
      { month: "Jul", visits: 0 },
      { month: "Aug", visits: 0 },
      { month: "Sep", visits: 0 },
      { month: "Oct", visits: 0 },
      { month: "Nov", visits: 0 },
      { month: "Dec", visits: 0 }
    ];

    visits.forEach(v => {
      const monthIndex = new Date(v.visitDate).getMonth();
      monthlyTrend[monthIndex].visits += 1;
    });

    return res.json({
      success: true,
      year,
      monthlyTrend
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};
/* ================= YEARLY DCR TREND ================= */

export const getYearlyDCRTrend = async (req, res) => {
  try {
    let { year, mrId } = req.query;

    if (!year) {
      return res.status(400).json({
        message: "Year is required"
      });
    }

    year = Number(year);

    /* ===== Role Based Access ===== */

    if (req.user.role === "mr") {
      const mr = await MR.findOne({ user: req.user._id });
      if (!mr) {
        return res.status(404).json({ message: "MR profile not found" });
      }
      mrId = mr._id;
    }

    if (!mrId) {
      return res.status(400).json({
        message: "mrId required"
      });
    }

    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year, 11, 31, 23, 59, 59);

    const dcrs = await DCR.find({
      mr: mrId,
      date: { $gte: startDate, $lte: endDate }
    });

    /* ===== 12 Month Structure ===== */

    const monthlyTrend = [
      { month: "Jan", dcrs: 0 },
      { month: "Feb", dcrs: 0 },
      { month: "Mar", dcrs: 0 },
      { month: "Apr", dcrs: 0 },
      { month: "May", dcrs: 0 },
      { month: "Jun", dcrs: 0 },
      { month: "Jul", dcrs: 0 },
      { month: "Aug", dcrs: 0 },
      { month: "Sep", dcrs: 0 },
      { month: "Oct", dcrs: 0 },
      { month: "Nov", dcrs: 0 },
      { month: "Dec", dcrs: 0 }
    ];

    dcrs.forEach(d => {
      const monthIndex = new Date(d.date).getMonth();
      monthlyTrend[monthIndex].dcrs += 1;
    });

    return res.json({
      success: true,
      year,
      monthlyTrend
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};
/* ================= MR PERFORMANCE (ALL MRs) ================= */

export const getMRPerformance = async (req, res) => {
  try {
    const { year, month } = req.query;

    if (!year || !month) {
      return res.status(400).json({
        message: "year and month required"
      });
    }

    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59);

    /* ===== All MRs ===== */
    const mrs = await MR.find().populate("user", "name email");

    const performance = [];

    for (let mr of mrs) {
      const visitCount = await Visit.countDocuments({
        mr: mr._id,
        visitDate: { $gte: startDate, $lte: endDate }
      });

      const dcrCount = await DCR.countDocuments({
        mr: mr._id,
        date: { $gte: startDate, $lte: endDate }
      });

      performance.push({
        mrId: mr._id,
        name: mr.user?.name,
        email: mr.user?.email,
        totalVisits: visitCount,
        totalDCRs: dcrCount
      });
    }

    res.json({
      success: true,
      year,
      month,
      performance
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
export const exportMonthlyExcel = async (req, res) => {
  try {
    const { mrId, month, year } = req.query;

    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Monthly Report");

    sheet.columns = [
      { header: "Metric", key: "metric", width: 30 },
      { header: "Value", key: "value", width: 20 }
    ];

    // Fetch data (reuse your function logic)
    const visits = await Visit.find({ mr: mrId });
    const dcrs = await DCR.find({ mr: mrId });

    sheet.addRow({ metric: "Total Visits", value: visits.length });
    sheet.addRow({ metric: "Total DCRs", value: dcrs.length });

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=monthly-report.xlsx"
    );

    await workbook.xlsx.write(res);
    res.end();

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
