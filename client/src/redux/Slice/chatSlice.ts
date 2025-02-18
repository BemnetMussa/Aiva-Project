import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

interface Message {
  _id: string;
  chatId: string;
  sender: string;
  content: string;
  messageType: "text" | "image" | "video" | "audio" | "file";
  createdAt: string;
}

interface ChatState {
  chats: any[];
  messages: Message[];
  activeChat: string | null;
}

const initialState: ChatState = { chats: [], messages: [], activeChat: null };

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChats: (state, action: PayloadAction<any[]>) => {
      state.chats = action.payload;
    },
    setMessages: (state, action: PayloadAction<Message[]>) => {
      state.messages = action.payload;
    },
    addMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
    },
    setActiveChat: (state, action: PayloadAction<string | null>) => {
      state.activeChat = action.payload;
    },
  },
});

const persistConfig = {
  key: "chat",
  storage,
};

export const { setChats, setMessages, addMessage, setActiveChat } =
  chatSlice.actions;
export const chatReducer = persistReducer(persistConfig, chatSlice.reducer);
