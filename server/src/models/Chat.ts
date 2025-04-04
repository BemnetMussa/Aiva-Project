import mongoose, { Schema, Document, Types } from "mongoose";

export interface IChat extends Document {
  user1: Types.ObjectId;
  user2: Types.ObjectId;
  lastMessage?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const ChatSchema = new Schema<IChat>(
  {
    user1: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    user2: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    lastMessage: {
      type: Schema.Types.ObjectId,
      ref: "Message",
    },
  },
  { timestamps: true }
);

// Ensure uniqueness for chat between two users
ChatSchema.index({ user1: 1, user2: 1 }, { unique: true });

const Chat = mongoose.model<IChat>("Chat", ChatSchema);

export default Chat;
