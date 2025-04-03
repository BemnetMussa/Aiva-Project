import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000"); // Connect to the backend socket

// Define types
interface Chat {
  _id: string;
  user1: { _id: string; name: string; email: string; image: string };
  user2: { _id: string; name: string; email: string; image: string };
  lastMessage?: {
    _id: string;
    content: string;
    messageType: "text";
    createdAt: string;
    sender: string;
  };
  createdAt: string;
}

type MessageType = "text" | "file" | "image" | "video" | "audio";

interface Message {
  _id: string;
  chatId: string;
  sender: string | null;
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
  async (targetUserId: string, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/chat/start-chat",
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ targetUserId }),
        }
      );

      const data = await response.json();
      console.log(data);
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
      const res = await fetch(`http://localhost:5000/api/chat/user/${userId}`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();

      if (!res.ok) {
        // Handle error if the response is not OK
        console.log(data.message);
        throw new Error(data.message || "Failed to fetch chats");
      }

      console.log("user data chat list from db ", data);
      return data;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

// Thunk to getchatMessages
export const getChatMessages = createAsyncThunk(
  "chat/getChatMessages",
  async (chatId: string, { rejectWithValue }) => {
    try {
      const res = await fetch(`http://localhost:5000/api/message/${chatId}`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      // console.log("message fetch", data);
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
      console.log("chat slice action payload for message", action.payload);
      const message = action.payload;
      if (!state.messages[message.chatId]) {
        state.messages[message.chatId] = [];
      }

      // Prevent duplicate messages
      if (
        !state.messages[message.chatId].some((msg) => msg._id === message._id)
      ) {
        state.messages[message.chatId].push(message);
        console.log(message);
      }
    },

    setActiveChat: (state, action: PayloadAction<string | null>) => {
      state.activeChat = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle successful chat creation or retrieval
      .addCase(createOrGetChat.fulfilled, (state, action) => {
        const newChat = action.payload.chat;
        const existingChat = state.chats?.some(
          (chat) => chat?._id === newChat._id
        );
        if (!existingChat) {
          state.chats?.push(newChat);
        }
        state.loading = false;
      })
      // Handle setting the loading state
      .addCase(createOrGetChat.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrGetChat.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string; // Store error message
      })
      // Handle successful message send
      // .addCase(sendMessage.fulfilled, (state, action) => {
      //   const chatId = action.payload.chat._id;
      //   if (!state.messages[chatId]) {
      //     state.messages[chatId] = [];
      //   }
      //   state.messages[chatId].push(action.payload); // Add the new message to the current chat
      // })
      // Handle fetching user chats
      .addCase(getUserChats.fulfilled, (state, action) => {
        state.chats = action.payload; // Update chat list with user chats

        // Store last messages in messages state
        action.payload.forEach((chat: Chat) => {
          if (chat.lastMessage) {
            if (!state.messages[chat._id]) {
              state.messages[chat._id] = [];
            }

            // Ensure the last message is unique
            const lastMessageExists = state.messages[chat._id].some(
              (msg) => msg._id === chat.lastMessage?._id
            );

            if (!lastMessageExists) {
              state.messages[chat._id].push({
                _id: chat.lastMessage._id,
                chatId: chat._id,
                sender: chat.lastMessage.sender,
                content: chat.lastMessage.content,
                messageType: chat.lastMessage.messageType || "text",
                createdAt: chat.lastMessage.createdAt,
              });
            }
          }
        });
      })
      .addCase(getUserChats.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserChats.rejected, (state, action) => {
        state.error = action.error.message ?? null;
        state.loading = false;
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
      });
  },
});

export const { setChats, setMessages, addMessage, setActiveChat } =
  chatSlice.actions;
export type { Message, Chat };

export default chatSlice.reducer;
