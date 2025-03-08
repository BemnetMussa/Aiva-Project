import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000"); // Connect to the backend socket

// Define types
interface Chat {
  _id: string;
  user1: { _id: string; name: string; email: string; image: string };
  user2: { _id: string; name: string; email: string; image: string };
  lastMessage?: { content: string };
  createdAt: string;
}

type MessageType = "text" | "file" | "image" | "video" | "audio";

interface Message {
  _id: string;
  chatId: string;
  sender: string;
  content: string;
  messageType: MessageType;
  createdAt: string;
}

interface ChatState {
  chats: Chat[];
  messages: { [chatId: string]: Message[] };
  activeChat: string | null;
  error: string | null;
  loading: boolean;
}

// Create or get a chat between two users
export const createOrGetChat = createAsyncThunk(
  "chat/createOrGetChat",
  async ({ user1, user2 }: Chat, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/chat/get-create-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user1, user2 }),
      });

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to create/get chat");

      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk to Delete a chat
export const deleteChat = createAsyncThunk<
  { chatId: string },
  string,
  { rejectValue: string }
>("chat/deleteChat", async (chatId, { rejectWithValue }) => {
  try {
    const response = await fetch(`/api/chat/delete-chat/${chatId}`, {
      method: "DELETE",
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Failed to delete chat");

    return { chatId };
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

// Thunk to get all chats for a user
export const getUserChats = createAsyncThunk(
  "chat/getUserChats",
  async (userId: string, { rejectWithValue }) => {
    try {
      const res = await fetch(`/api/chat/user/${userId}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk to send message
export const sendMessage = createAsyncThunk(
  "chat/sendMessage",
  async (
    {
      chatId,
      sender,
      content,
    }: { chatId: string; sender: string; content: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await fetch(`/api/message/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chatId, sender, content }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk to getchatMessages
export const getChatMessages = createAsyncThunk(
  "chat/getChatMessages",
  async (chatId: string, { rejectWithValue }) => {
    try {
      const res = await fetch(`/api/message/${chatId}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk to markMessagesAsRead
export const markMessagesAsRead = createAsyncThunk(
  "chat/markMessagesAsRead",
  async (
    { chatId, userId }: { chatId: string; userId: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await fetch(`/api/message/read`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chatId, userId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState: ChatState = {
  chats: [],
  messages: {},
  activeChat: null,
  error: null,
  loading: false,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChats: (state, action: PayloadAction<Chat[]>) => {
      state.chats = action.payload;
    },
    setMessages: (
      state,
      action: PayloadAction<{ chatId: string; messages: Message[] }>
    ) => {
      state.messages[action.payload.chatId] = action.payload.messages;
    },

    addMessage: (state, action: PayloadAction<Message>) => {
      const { chatId } = action.payload;
      if (!state.messages[chatId]) {
        state.messages[chatId] = [];
      }
      state.messages[chatId].push(action.payload);
    },

    setActiveChat: (state, action: PayloadAction<string | null>) => {
      state.activeChat = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle successful chat creation or retrieval
      .addCase(createOrGetChat.fulfilled, (state, action) => {
        const existingChat = state.chats.find(
          (chat) => chat._id === action.payload._id
        );
        if (!existingChat) {
          state.chats.push(action.payload);
        }
        state.loading = false;
      })
      // Handle successful message send
      .addCase(sendMessage.fulfilled, (state, action) => {
        const { chatId } = action.payload;
        if (!state.messages[chatId]) {
          state.messages[chatId] = [];
        }
        state.messages[chatId].push(action.payload); // Add the new message to the current chat
      })
      // Handle fetching user chats
      .addCase(getUserChats.fulfilled, (state, action) => {
        state.chats = action.payload; // Update chat list with user chats
      })
      // Handle fetching messages for a chat
      .addCase(getChatMessages.fulfilled, (state, action) => {
        state.messages[action.meta.arg] = action.payload; // Update messages for the active chat
      })
      .addCase(deleteChat.fulfilled, (state, action) => {
        if (!action.payload?.chatId) return; // Ensure payload exists
        state.chats = state.chats.filter(
          (chat) => chat._id !== action.payload.chatId
        );
        delete state.messages[action.payload.chatId];
      })
      // Handle setting the loading state
      .addCase(createOrGetChat.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrGetChat.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string; // Store error message
      });
  },
});

export const { setChats, setMessages, addMessage, setActiveChat } =
  chatSlice.actions;
export type { Message, Chat };

export default chatSlice.reducer;
