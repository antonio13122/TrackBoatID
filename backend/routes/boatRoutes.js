const express = require("express");
const Boat = require("../models/Boat");
const router = express.Router();

router.get("/all", async (req, res) => {
  try {
    const boats = await Boat.find();
    res.json(boats);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});
module.exports = router;
