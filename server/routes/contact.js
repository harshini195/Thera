import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

router.post("/", async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message)
    return res.status(400).json({ error: "All fields required" });

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: email,
      to: process.env.EMAIL_ADDRESS,
      subject: `Message from ${name}`,
      text: message,
    });

    res.status(200).json({ message: "Message sent successfully!" });
  } catch (err) {
    console.error("Mail Error: ", err);
    res.status(500).json({ error: "Email failed to send" });
  }
});

export default router;
