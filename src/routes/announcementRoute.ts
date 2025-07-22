import express from "express";
import {
  getAnnouncementForUser,
  getRecentAnnouncements,
  deleteAnnouncement,
  editAnnouncement,
  addAnnouncement,
} from "../services/announcementService";
import validateJWT from "../middlewares/validateJWT";
import { announcementModel } from "../models/announcementModel";
import { io } from "../index";

const router = express.Router();

// Get announcement by id
router.get("/:announcementId", validateJWT, async (req, res) => {
  try {
    const { announcementId } = req.params;
    const announcement = await getAnnouncementForUser({ announcementId });
    res.status(200).send(announcement);
  } catch {
    res.status(500).send("Something went wrong");
  }
});

// Get recent announcements
router.get("/", validateJWT, async (req, res) => {
  try {
    const announcements = await getRecentAnnouncements();
    res.status(200).send(announcements);
  } catch {
    res.status(500).send("Something went wrong");
  }
});

// Add a new announcement
router.post("/", validateJWT, async (req, res) => {
  try {
    const { name, subject, avatar, message } = req.body;
    const announcement = await addAnnouncement({
      name,
      subject,
      avatar,
      message,
    });
    io.emit("announcement:new", announcement); // Emit to all clients
    res.status(201).send(announcement);
  } catch {
    res.status(500).send("Something went wrong");
  }
});

// Delete an announcement by ID
router.delete("/:announcementId", validateJWT, async (req, res) => {
  try {
    const { announcementId } = req.params;
    const deleted = await deleteAnnouncement(announcementId);
    if (!deleted) {
      res.status(404).send("Announcement not found");
      return;
    }
    res.status(200).send({ message: "Announcement deleted" });
  } catch {
    res.status(500).send("Something went wrong");
  }
});

// Edit an announcement by ID
router.put("/:announcementId", validateJWT, async (req, res) => {
  try {
    const { announcementId } = req.params;
    const update = req.body;
    const updated = await editAnnouncement({ announcementId, update });
    if (!updated) {
      res.status(404).send("Announcement not found");
      return;
    }
    res.status(200).send(updated);
  } catch {
    res.status(500).send("Something went wrong");
  }
});

export default router;
