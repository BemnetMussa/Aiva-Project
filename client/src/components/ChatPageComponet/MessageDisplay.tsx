import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useEffect, useRef } from "react";
import socket from "../../socket";
import { addMessage, Message, setTyping } from "../../redux/slices/chatSlice";

interface TypingData {
  userName: string; // assuming typing event contains the user's name
  chatId: string;
  senderId: string;
}

const MessageDisplayer = () => {
  const { messages, activeChat } = useSelector(
    (state: RootState) => state.chat
  );
  const user = useSelector((state: RootState) => state.auth.user);
  const typing = useSelector((state: RootState) => state.chat.typingUsers);
  const dispatch = useDispatch();
  const chatMessages = activeChat ? messages[activeChat] || [] : [];
  // Reference to scroll to the bottom
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll to the latest message
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages, typing]);

  useEffect(() => {
    socket.on("newMessage", (newMessage: Message) => {
      console.log("recieve message", newMessage);
      if (newMessage.chatId === activeChat) {
        dispatch(addMessage(newMessage));
      }
    });
    return () => {
      socket.off("newMessage");
    };
  }, [activeChat, dispatch]);

  useEffect(() => {
    const handleTyping = (typing: TypingData) => {
      dispatch(setTyping(typing));
    };
    socket.on("displayTyping", handleTyping);

    return () => {
      socket.off("displayTyping");
    };
  }, [activeChat, dispatch]);

  // Ensure messages are sorted by createdAt
  const sortedMessages = [...chatMessages].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  const typingInfo = typing[activeChat ?? ""];

  return (
    <div className="flex-1 p-4 w-full h-full">
      {/* displaying sorted message */}
      <div>
        {sortedMessages.map((msg: any) => {
          const sender =
            msg.sender && msg.sender._id ? msg.sender : { _id: msg.sender };

          //  console.log("user typechat", typeInfoChat?.userName);
          return (
            <div
              key={msg._id}
              className={`flex p-2 my-2 ${
                sender._id === user?._id ? "justify-end" : "justify-start"
              }`}
            >
              <span
                className={`p-2 rounded-md ${
                  sender._id === user?._id
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-black"
                } max-w-xs`}
              >
                {msg.content}
              </span>
            </div>
          );
        })}
      </div>

      {/* Typing Indicator (Displayed above messages) */}
      {typingInfo?.userName && typingInfo?.userName !== user?.name && (
        <div className="flex p-2 text-sm italic text-gray-500 ml-2">
          {typingInfo.userName} is typing...
        </div>
      )}
      {/* Scroll to latest message */}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageDisplayer;
