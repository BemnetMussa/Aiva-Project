import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useEffect, useRef } from "react";
import socket from "../../socket";
import { addMessage } from "../../redux/slices/chatSlice";

const MessageDisplayer = () => {
  const { messages, activeChat } = useSelector(
    (state: RootState) => state.chat
  );
  // console.log("message", messages);
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const chatMessages = activeChat ? messages[activeChat] || [] : [];
  // Reference to scroll to the bottom
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll to the latest message
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages]);

  useEffect(() => {
    socket.on("newMessage", (newMessage) => {
      console.log("recieve message", newMessage);
      if (newMessage.chatId === activeChat) {
        dispatch(addMessage(newMessage));
      }
    });
    return () => {
      socket.off("newMessage");
    };
  }, [activeChat, dispatch]);

  // console.log("chatmessage", chatMessages);

  // Ensure messages are sorted by createdAt
  const sortedMessages = [...chatMessages].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  console.log("sorted message", sortedMessages);

  return (
    <div className="flex-1 p-4 w-full h-full">
      {sortedMessages.map((msg: any) => (
        <div
          key={msg._id}
          className={`flex p-2 my-2 ${
            msg.sender._id === user?._id ? "justify-end" : "justify-start"
          }`}
        >
          <span
            className={`p-2 rounded-md ${
              msg.sender._id === user?._id
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-black"
            } max-w-xs`}
          >
            {msg.content}
          </span>
        </div>
      ))}

      {/* Scroll to latest message */}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageDisplayer;
