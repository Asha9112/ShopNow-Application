const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

/* -------------------- IMPORT ROUTES -------------------- */
const authRoutes = require("./routes/authRoutes");

/* -------------------- CREATE APP -------------------- */
const app = express();

/* -------------------- MIDDLEWARE -------------------- */
app.use(cors());
app.use(express.json());

/* -------------------- DATABASE CONNECTION -------------------- */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected Successfully");
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err.message);
  });

/* -------------------- ROUTES -------------------- */
app.use("/api/auth", authRoutes);

/* -------------------- TEST ROUTE -------------------- */
app.get("/", (req, res) => {
  res.status(200).json({
    message: "🚀 ShopNow Backend Running Successfully",
  });
});

/* -------------------- 404 HANDLER -------------------- */
app.use((req, res) => {
  res.status(404).json({
    error: "Route Not Found",
  });
});

/* -------------------- GLOBAL ERROR HANDLER -------------------- */
app.use((err, req, res, next) => {
  console.error("🔥 Server Error:", err.stack);
  res.status(500).json({
    error: "Something went wrong!",
  });
});

/* -------------------- START SERVER -------------------- */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
