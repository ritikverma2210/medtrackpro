import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import doctorRoutes from "./routes/doctor.routes.js";
import territoryRoutes from "./routes/territory.routes.js";
import mrRoutes from "./routes/mr.routes.js";
import mrDoctorRoutes from "./routes/mrDoctor.routes.js";
import visitRoutes from "./routes/visit.routes.js";
import productRoutes from "./routes/product.routes.js";
import dcrRoutes from "./routes/dcr.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import analyticsRoutes from "./routes/analytics.routes.js";
import reportRoutes from "./routes/report.routes.js";
import notificationRoutes from "./routes/notification.routes.js";

const app = express();

/* ================= MIDDLEWARE ================= */

app.use(cors());
app.use(express.json());

/* ================= HEALTH ================= */

app.get("/", (req, res) => {
  res.send("MedTrackPro API is running 🚀");
});

/* ================= ROUTES ================= */

app.use("/api/auth", authRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/mr", mrRoutes);
app.use("/api/territory", territoryRoutes);
app.use("/api/mr-doctors", mrDoctorRoutes);
app.use("/api/visits", visitRoutes);
app.use("/api/products", productRoutes);
app.use("/api/dcr", dcrRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/notifications", notificationRoutes);

/* ================= 404 ================= */

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

/* ================= ERROR ================= */

app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Server Error"
  });
});

export default app;