import { announcementModel } from "../models/announcementModel";

interface GetAnnouncementForUser {
  announcementId: string; // use 'string' not 'String'
}

export const getAnnouncementForUser = async ({
  announcementId,
}: GetAnnouncementForUser) => {
  try {
    const announcement = await announcementModel
      .findById(announcementId)
      .lean();
    return announcement; // null if not found
  } catch (error) {
    console.error("Failed to get announcement:", error);
    throw new Error("Invalid announcement ID");
  }
};

export const deleteAnnouncement = async (announcementId: string) => {
  try {
    const result = await announcementModel.findByIdAndDelete(announcementId);
    return result; // null if not found
  } catch (error) {
    console.error("Failed to delete announcement:", error);
    throw new Error("Invalid announcement ID");
  }
};

interface EditAnnouncementParams {
  announcementId: string;
  update: Partial<{
    name: string;
    subject: string;
    avatar: string;
    message: string;
  }>;
}

export const editAnnouncement = async ({
  announcementId,
  update,
}: EditAnnouncementParams) => {
  try {
    const updated = await announcementModel
      .findByIdAndUpdate(
        announcementId,
        { $set: update },
        { new: true, runValidators: true }
      )
      .lean();
    return updated; // null if not found
  } catch (error) {
    console.error("Failed to edit announcement:", error);
    throw new Error("Invalid announcement ID or update data");
  }
};

export const getRecentAnnouncements = async () => {
  try {
    const announcements = await announcementModel
      .find({})
      .sort({ createdAt: -1 })
      .limit(4)
      .lean();
    return announcements;
  } catch (error) {
    console.error("Failed to get all announcements:", error);
    throw new Error("Failed to fetch announcements");
  }
};

export const getAllAnnouncements = async () => {
  try {
    const announcements = await announcementModel.find({}).lean();
    return announcements;
  } catch (error) {
    console.error("Failed to get all announcements:", error);
    throw new Error("Failed to fetch announcements");
  }
};
interface AddAnnouncementParams {
  name: string;
  subject: string;
  avatar: string;
  message: string;
}

export const addAnnouncement = async ({
  name,
  subject,
  avatar,
  message,
}: AddAnnouncementParams) => {
  try {
    const announcement = await announcementModel.create({
      name,
      subject,
      avatar,
      message,
    });
    return announcement;
  } catch (error) {
    console.error("Failed to add announcement:", error);
    throw new Error("Failed to add announcement");
  }
};
