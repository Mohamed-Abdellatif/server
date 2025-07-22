import mongoose, { Document, Schema } from "mongoose";

export interface IAnnouncement extends Document {
  name: string;
  subject: string;
  avatar: string;
  message: string;
}

const announcementSchema = new Schema<IAnnouncement>({
  name: { type: String, required: true },
  subject: { type: String, required: true },
  avatar: { type: String, required: true },
  message: { type: String, required: true },
});

export const announcementModel = mongoose.model<IAnnouncement>(
  "Announcement",
  announcementSchema
);
