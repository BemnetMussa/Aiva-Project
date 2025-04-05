import { Message } from "./redux/slices/chatSlice";

export interface clientToServer {
  sendMessage: (message: Message) => void;
  stopTyping: (data: {
    chatId: string | null;
    userName: string;
    senderId: string;
  }) => void;
  typing: (data: {
    chatId: string;
    userName: string;
    senderId: string;
  }) => void;
}

export interface serverToClient {
  newMessage: (message: Message) => void;
  displayTyping: (data: {
    userName: string;
    chatId: string;
    senderId: string;
  }) => void;
}
