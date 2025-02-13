const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
require("dotenv").config();
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
require("./services/overdueChecker");


const app = express();
app.use(express.json());
app.use(cors());
// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("MongoDB connection failed:", err);
    process.exit(1); // Exit process on connection failure
  });

// Routes
app.use("/api/auth", authRoutes);
app.use("/api", productRoutes);



// Add error handling middleware
app.use((err, req, res, next) => {
  console.error("Global error handler:", err);
  res.status(500).json({
    error: "Internal server error",
    details: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
