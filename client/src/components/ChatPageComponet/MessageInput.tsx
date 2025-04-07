import { Ellipsis, Mic, MoveRight, Paperclip, Smile } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage, Message } from "../../redux/slices/chatSlice";
import { RootState } from "../../redux/store";
import socket from "../../socket";
import EmojiPicker from "emoji-picker-react";

export const MessageInput = () => {
  const chats = useSelector((state: RootState) => state.chat);
  const user = useSelector((state: RootState) => state.auth.user);
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [inputFocus, setInputFocus] = useState(false);
  const dispatch = useDispatch();

  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleTyping = () => {
    if (!chats.activeChat || !user) return;
    socket.emit("typing", {
      chatId: chats.activeChat,
      userName: user.name,
      senderId: user._id,
    });

    // Debounce stopTyping event (clear previous timeout)

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      socket.emit("stopTyping", {
        chatId: chats.activeChat,
        senderId: "",
        userName: "",
      });
    }, 2000); // Stops typing after 2s of inactivity
  };

  const handleEmojiClick = (emojiData: any) => {
    setMessage((prev) => prev + emojiData.emoji);
    setShowEmojiPicker(false);
  };

  const handleMessage = (e: React.FormEvent) => {
    e.preventDefault();

    if (!message.trim()) return;

    const newMessage: Message = {
      _id: crypto.randomUUID(), // Generates a unique ID
      chatId: chats.activeChat ?? "", // Assuming chats.activeChat holds the current chat ID
      sender: user?._id ?? "", // Assuming auth.user contains the logged-in user's ID
      content: message, // Assuming 'message' holds the text content
      messageType: "text", // You can change this to "file", "image", etc.
      createdAt: new Date().toISOString(),
    };

    socket.emit("sendMessage", newMessage);
    dispatch(addMessage(newMessage));

    // Stop typing event
    socket.emit("stopTyping", {
      chatId: chats.activeChat,
      senderId: "",
      userName: "",
    });
    setMessage("");
    setInputFocus(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      handleMessage(e as any); // Handle message send on Enter (without Shift)
      setInputFocus(false);
    } else {
      // Trigger typing indicator
      handleTyping();
    }
  };
  return (
    <div className="relative flex-1 mr-40 ml-5 flex items-center gap-5">
      {/* Emoji Picker (absolutely positioned, outside the input box) */}
      {showEmojiPicker && (
        <div className="absolute bottom-14 left-0 z-50">
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </div>
      )}

      <div
        className={`flex-2 flex items-center gap-3 bg-gray-100 px-3 py-2 border- border-gray-100 rounded-full ${
          showEmojiPicker || inputFocus ? "border-gray-200 border-2" : ""
        }`}
      >
        {/* Emoji Button */}
        <button onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
          <Smile size={18} />
        </button>

        {/* Input Field */}
        <form className="flex w-full" onSubmit={handleMessage}>
          <input
            type="text"
            value={message}
            onKeyDown={handleKeyPress}
            onChange={(e) => {
              setMessage(e.target.value);
              setInputFocus(true);
            }}
            className="w-full border-none focus:ring-0 focus:outline-none bg-transparent"
          />
          <button type="submit" className="cursor-pointer">
            <MoveRight className="text-cyan-700" size={22} />
          </button>
        </form>
      </div>

      {/* Right Icons */}
      <Mic className="text-cyan-500" />
      <Paperclip className="text-cyan-500" />
      <Ellipsis className="text-cyan-500" />
    </div>
  );
};
