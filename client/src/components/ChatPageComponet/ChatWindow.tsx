import { Phone, Settings, Dot, Video, MessageCircle } from "lucide-react";
import { MessageInput } from "./MessageInput";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import MessageDisplayer from "./MessageDisplay";
import socket from "../../socket";
import { useEffect } from "react";
import { getChatMessages } from "../../redux/slices/chatSlice";

export const ChatWindow = () => {
  const { activeChat, chats } = useSelector((state: RootState) => state.chat);
  const currentChat = chats?.find((chat) => chat._id === activeChat);
  const user = useSelector((state: RootState) => state.auth.user);
  const chatId = currentChat?._id;

  const dispatch = useDispatch<AppDispatch>();

  // Determine the other user in the chat
  const otherUser =
    currentChat?.user1._id === user?._id
      ? currentChat?.user2
      : currentChat?.user1;

  useEffect(() => {
    if (chatId) {
      socket.emit("joinChat", chatId); // Join the chat when opening it
      console.log(`Joined chat: ${chatId}`);
    }

    return () => {
      if (chatId) {
        socket.emit("leaveChat", chatId); // Leave the chat when closing it
        console.log(`Left chat: ${chatId}`);
      }
    };
  }, [chatId]);

  useEffect(() => {
    dispatch(getChatMessages(chatId ?? ""));
  }, [chatId, dispatch]);

  if (!currentChat) {
    return (
      <div className="flex-3 flex flex-col shadow-2xl">
        <div className="flex-7 flex justify-center items-center">
          <MessageCircle size={50} className="text-cyan-600" />
          <span className="text-2xl font-bold text-gray-800">
            Select a chat to start messaging
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-3 flex flex-col shadow-2xl h-full">
      <div className="flex-1 flex justify-between items-center mx-5">
        <div className="flex justify-between items-center gap-3">
          <Dot size={60} className="text-green-600" />
          <img
            src={otherUser?.image || "/default-avatar.png"}
            alt={otherUser?.name}
            className="w-12 h-12 rounded-full"
          />
          <span className="font-semibold tracking-wider text-xl">
            {otherUser?.name}
          </span>
          <Settings size={18} className="ml-4 cursor-pointer" />
        </div>

        <div className="flex justify-between items-center gap-5 text-cyan-500">
          <button className="cursor-pointer" aria-label="Phone call">
            <Phone />
          </button>
          <button className="cursor-pointer" aria-label="Video call">
            <Video />
          </button>
        </div>
      </div>

      <div className="flex-7 overflow-y-auto">
        <MessageDisplayer />
      </div>

      <MessageInput />
    </div>
  );
};
