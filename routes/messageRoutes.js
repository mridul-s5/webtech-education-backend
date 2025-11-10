import express from "express";
import Message from "../models/Message.js";

const router = express.Router();

// POST message
router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const msg = new Message({ name, email, message });
    await msg.save();
    res.json({ success: true, message: "Message saved successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error saving message", error });
  }
});

// GET all messages (admin use)
router.get("/", async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: "Error fetching messages" });
  }
});

export default router;
