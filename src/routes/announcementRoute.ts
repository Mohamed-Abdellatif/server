import express from "express";
import {
  getAnnouncementById,
  getRecentAnnouncements,
  addAnnouncement,
  deleteAnnouncement,
  editAnnouncement,
  getAllAnnouncements,
} from "../controllers/announcementController";
import validateJWT from "../middlewares/validateJWT";
import { announcementModel } from "../models/announcementModel";
import { io } from "../index";

const router = express.Router();

router.get("/all", validateJWT, getAllAnnouncements);
// Get recent announcements
router.get("/", validateJWT, getRecentAnnouncements);

router.get("/:announcementId", validateJWT, getAnnouncementById);

// Add a new announcement
router.post("/", validateJWT, addAnnouncement);

// Get announcement by id

// Delete an announcement by ID
router.delete("/:announcementId", validateJWT, deleteAnnouncement);

// Edit an announcement by ID
router.put("/:announcementId", validateJWT, editAnnouncement);

export default router;
