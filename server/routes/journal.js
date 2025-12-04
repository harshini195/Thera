import express from "express";
import auth from "../middleware/auth.js";
import Journal from "../models/Journal.js";

const router = express.Router();

// Get single entry
router.get("/:date", auth, async (req, res) => {
  try {
    const entry = await Journal.findOne({
      userId: req.user.id,
      date: req.params.date
    });

    if (!entry) {
      return res.json({ entry: "", title: "", color: "#ccdeed" });
    }
    res.json(entry);
  } catch (error) {
    console.error("Get Journal Error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Get all entries
router.get("/", auth, async (req, res) => {
  try {
    const entries = await Journal.find({ userId: req.user.id }).sort({ date: -1 });
    res.json(entries);
  } catch (error) {
    console.error("Fetch All Error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Save entry
router.post("/:date", auth, async (req, res) => {
  try {
    const { title, entry, color } = req.body;
    const date = req.params.date;

    const saved = await Journal.findOneAndUpdate(
      { userId: req.user.id, date },
      { title, entry, color },
      { new: true, upsert: true }
    );

    res.json({ message: "Journal saved!", saved });
  } catch (error) {
    console.error("Save Journal Error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
