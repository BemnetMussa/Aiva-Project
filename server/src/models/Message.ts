import mongoose, { Document, Types } from "mongoose";

export interface IMessage extends Document {
  chatId: Types.ObjectId;
  sender: Types.ObjectId;
  content?: string;
  messageType: "text" | "image" | "video" | "audio" | "file";
  fileUrl?: string;
  readBy: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const messageSchema = new mongoose.Schema(
  {
    chatId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
      required: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      trim: true,
    },
    messageType: {
      type: String,
      enum: ["text", "image", "video", "audio", "file"],
      default: "text",
    },
    fileUrl: {
      type: String, // For media files
    },
    readBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      }
    ], // Changed to an array of User references
    
  },
  { timestamps: true }
);

const Message = mongoose.model<IMessage>("Message", messageSchema);

export default Message;
