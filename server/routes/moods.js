import express from "express";
import auth from "../middleware/auth.js";
import Mood from "../models/Mood.js";
const router = express.Router();
router.post("/add", auth, async (req, res) => {
  try {
    const { month, day, mood } = req.body;

    if (!mood || !mood.label || !mood.color) {
      return res.status(400).json({ error: "Mood label & color required" });
    }

    const savedMood = await Mood.findOneAndUpdate(
      { userId: req.user.id, month, day },
      { userId: req.user.id, month, day, mood },
      { new: true, upsert: true }
    );

    res.json(savedMood);
  } catch (err) {
    console.error(" Mood Save Error:", err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
});
router.get("/all", auth, async (req, res) => {
  try {
    const moods = await Mood.find({ userId: req.user.id });
    res.json(moods);
  } catch (err) {
    console.error("Mood Fetch Error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
