import mongoose from "mongoose";

const JournalSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  date: {
    type: String,
    required: true,
    unique: false
  },
  title: {
    type: String,
    default: ""
  },
  entry: {
    type: String,
    default: ""
  },
  color: {
    type: String,
    default: "#ccdeed"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

JournalSchema.index({ userId: 1, date: 1 }, { unique: true });

export default mongoose.model("Journal", JournalSchema);
