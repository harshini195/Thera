import fs from "fs";
import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";
import Journal from "./models/Journal.js";
import Mood from "./models/Mood.js";

dotenv.config();
await mongoose.connect(process.env.MONGO_URI);

const users = JSON.parse(fs.readFileSync("../backend/data/users.json"));
const journals = JSON.parse(fs.readFileSync("../backend/data/journal_entries_2025.json"));
const moods = JSON.parse(fs.readFileSync("../backend/data/moods_2025.json"));

await User.insertMany(users);
await Journal.insertMany(journals);
await Mood.insertMany(moods);

console.log("Data migrated successfully ✔");
mongoose.connection.close();
