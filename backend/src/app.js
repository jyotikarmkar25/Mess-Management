const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());

// Static Folder For Images
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Routes
const authRoutes = require("./routes/authRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");
const menuRoutes = require("./routes/menuRoutes");
const adminUserRoutes = require("./routes/userRoutes");

// Route Middleware
app.use("/api/auth", authRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/feedbacks", feedbackRoutes);
app.use("/api/menus", menuRoutes);
app.use("/api/admin/users", adminUserRoutes);

module.exports = app;