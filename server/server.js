import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import contactRoutes from "./routes/contact.js";

import authRoutes from "./routes/auth.js";
import journalRoutes from "./routes/journal.js";
import moodRoutes from "./routes/moods.js";

dotenv.config();
connectDB();

const app = express();

// ✅ FIXED CORS — now signup will work properly
app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

app.use(express.json());

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/journal", journalRoutes);
app.use("/api/moods", moodRoutes);
app.use("/api/contact", contactRoutes);

app.get("/", (req, res) => res.send("Thera MERN API working!"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on PORT:", PORT));
