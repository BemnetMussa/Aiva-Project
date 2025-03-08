import { Ellipsis, Mic, MoveRight, Paperclip, Smile } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage, Message } from "../../redux/slices/chatSlice";
import { RootState } from "../../redux/store";

export const MessageInput = () => {
  const chats = useSelector((state: RootState) => state.chat);
  const auth = useSelector((state: RootState) => state.auth);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const handleMessage = (e: React.FormEvent) => {
    e.preventDefault();

    if (!message.trim()) return;
    const newMessage: Message = {
      _id: crypto.randomUUID(), // Generates a unique ID
      chatId: chats.activeChat ?? "", // Assuming chats.activeChat holds the current chat ID
      sender: auth.user._id, // Assuming auth.user contains the logged-in user's ID
      content: message, // Assuming 'message' holds the text content
      messageType: "text", // You can change this to "file", "image", etc.
      createdAt: new Date().toISOString(),
    };

    dispatch(addMessage(newMessage));
    setMessage("");
  };
  return (
    <div className="flex-1 mr-40 ml-5 flex items-center gap-5">
      <div className="flex-2 flex items-center gap-3 bg-gray-100 px-3 py-2 border border-gray-100 rounded-full">
        <Smile size={18} />
        <form className="flex w-full" onSubmit={handleMessage}>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full  border-none focus:ring-0 focus:outline-none"
          />
          <button type="submit" className="cursor-pointer">
            <MoveRight className="text-cyan-700 " size={22} />
          </button>
        </form>
      </div>
      <Mic className="text-cyan-500" />
      <Paperclip className="text-cyan-500" />
      <Ellipsis className="text-cyan-500" />
    </div>
  );
};
