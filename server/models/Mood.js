import mongoose from "mongoose";

const MoodSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  month: {
    type: Number,
    required: true
  },
  day: {
    type: Number,
    required: true
  },
  mood: {
    label: { type: String, required: true },
    color: { type: String, required: true }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Prevent duplicate moods for same user/day
MoodSchema.index({ userId: 1, month: 1, day: 1 }, { unique: true });

export default mongoose.model("Mood", MoodSchema);
