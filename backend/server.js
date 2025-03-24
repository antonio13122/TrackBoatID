require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const Tesseract = require("tesseract.js");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("uploads"));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
