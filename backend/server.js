require("dotenv").config();
const express = require("express");

const cors = require("cors");
const multer = require("multer");
const Tesseract = require("tesseract.js");
const path = require("path");
const connectDB = require("./db");

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("uploads"));

connectDB();
app.get("/", (req, res) => {
  res.send(" Backend is running!");
});

const boatRoutes = require("./routes/boatRoutes");
app.use("/api/boats", boatRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
