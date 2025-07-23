const express = require("express");
const router = express.Router();
const Consultancy = require("../models/Consultancy");

// POST route
router.post("/consultancy", async (req, res) => {
  const data = req.body;

  try {
    const existing = await Consultancy.findOne({ userEmail: data.userEmail });

    if (existing) {
      await Consultancy.findOneAndUpdate({ userEmail: data.userEmail }, data);
      return res.status(200).json({ message: "Consultancy updated" });
    }

    await Consultancy.create(data);
    res.status(201).json({ message: "Consultancy saved" });
  } catch (err) {
    console.error("Error saving consultancy:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET route
router.get("/consultancy/:email", async (req, res) => {
  try {
    const data = await Consultancy.findOne({ userEmail: req.params.email });
    if (!data) return res.status(404).json({ message: "Not found" });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE route
router.delete("/consultancy/:email", async (req, res) => {
  try {
    await Consultancy.deleteOne({ userEmail: req.params.email });
    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
