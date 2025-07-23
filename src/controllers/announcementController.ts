import { Request, Response } from "express";
import {
  getAnnouncementForUser,
  getRecentAnnouncements as getRecentAnnouncementsService,
  deleteAnnouncement as deleteAnnouncementService,
  editAnnouncement as editAnnouncementService,
  addAnnouncement as addAnnouncementService,
  getAllAnnouncements as getAllAnnouncementsService,
} from "../services/announcementService";
import { io } from "../index";

export const getAnnouncementById = async (req: Request, res: Response) => {
  try {
    const { announcementId } = req.params;
    const announcement = await getAnnouncementForUser({ announcementId });
    res.status(200).send(announcement);
  } catch {
    res.status(500).send("Something went wrong");
  }
};

export const getRecentAnnouncements = async (req: Request, res: Response) => {
  try {
    const announcements = await getRecentAnnouncementsService();
    res.status(200).send(announcements);
  } catch {
    res.status(500).send("Something went wrong");
  }
};

export const getAllAnnouncements = async (req: Request, res: Response) => {
  try {
    const announcements = await getAllAnnouncementsService();
    res.status(200).send(announcements);
  } catch {
    res.status(500).send("Something went wrong");
  }
};

export const addAnnouncement = async (req: Request, res: Response) => {
  try {
    const { name, subject, avatar, message } = req.body;
    const announcement = await addAnnouncementService({
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
};

export const deleteAnnouncement = async (req: Request, res: Response) => {
  try {
    const { announcementId } = req.params;
    const deleted = await deleteAnnouncementService(announcementId);
    if (!deleted) {
      res.status(404).send("Announcement not found");
      return;
    }
    res.status(200).send({ message: "Announcement deleted" });
  } catch {
    res.status(500).send("Something went wrong");
  }
};

export const editAnnouncement = async (req: Request, res: Response) => {
  try {
    const { announcementId } = req.params;
    const update = req.body;
    const updated = await editAnnouncementService({ announcementId, update });
    if (!updated) {
      res.status(404).send("Announcement not found");
      return;
    }
    res.status(200).send(updated);
  } catch {
    res.status(500).send("Something went wrong");
  }
};
