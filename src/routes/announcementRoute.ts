import express from "express";
import {
  getAnnouncementById,
  getRecentAnnouncements,
  addAnnouncement,
  deleteAnnouncement,
  editAnnouncement
} from "../controllers/announcementController";
import validateJWT from "../middlewares/validateJWT";
import { announcementModel } from "../models/announcementModel";
import { io } from "../index";

const router = express.Router();

// Get announcement by id
router.get("/:announcementId", validateJWT, getAnnouncementById);

// Get recent announcements
router.get("/", validateJWT, getRecentAnnouncements);

// Add a new announcement
router.post("/", validateJWT, addAnnouncement);

// Delete an announcement by ID
router.delete("/:announcementId", validateJWT, deleteAnnouncement);

// Edit an announcement by ID
router.put("/:announcementId", validateJWT, editAnnouncement);

export default router;
