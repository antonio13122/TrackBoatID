const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const sharp = require("sharp");
const Tesseract = require("tesseract.js");
const Boat = require("../models/Boat");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/identify", upload.single("boatImage"), async (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No image uploaded" });

  try {
    const imagePath = path.join(__dirname, "..", req.file.path);
    const processedPath = imagePath + "_processed.png";

    await sharp(imagePath)
      .resize({ width: 1000 })
      .grayscale()
      .threshold(150)
      .toFile(processedPath);

    const result = await Tesseract.recognize(processedPath, "eng", {
      tessedit_char_whitelist: "ABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789",
    });

    let rawText = result.data.text;
    console.log("Raw OCR output:", rawText);

    let cleanedText = rawText
      .replace(/[^a-zA-Z0-9\s]/g, "") // remove special characters
      .replace(/\s+/g, " ") // normalize spaces
      .trim()
      .toUpperCase();

    console.log("Cleaned boat name:", cleanedText);

    const keywords = cleanedText.split(" ").filter(Boolean);
    const searchRegex = new RegExp(keywords.join("|"), "i");

    const boat = await Boat.findOne({ ime_broda: searchRegex });

    fs.unlink(imagePath, () => {});
    fs.unlink(processedPath, () => {});

    if (boat) {
      req.io.emit("boat-arrival", boat); // Emit event
      return res.json({ found: true, boat });
    } else {
      return res.json({ found: false, message: "Boat not found" });
    }
  } catch (err) {
    console.error("Error processing image:", err);
    return res
      .status(500)
      .json({ message: "Error processing image", error: err });
  }
});

module.exports = router;
