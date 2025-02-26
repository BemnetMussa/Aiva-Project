import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../../redux/slices/chatSlice";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

const MessageDisplayer = () => {
  const dispatch = useDispatch();
  const messages = useSelector((state: any) => state.chat.messages);
  const activeChat = useSelector((state: any) => state.chat.activeChat);
  const user = useSelector((state: any) => state.auth.user);

  useEffect(() => {
    if (!activeChat) return;

    fetch(`http://localhost:5000/api/messages/${activeChat}`)
      .then((res) => res.json())
      .then((data) => dispatch(setMessages(data)))
      .catch((err) => console.error("Error fetching messages", err));

    socket.emit("joinChat", activeChat);

    socket.on("newMessage", (message) => {
      dispatch(setMessages([...messages, message]));
    });

    return () => {
      socket.off("newMessage");
    };
  }, [activeChat, dispatch]);

  return (
    <div className="flex-1 p-4 overflow-y-auto">
      {messages.map((msg: any) => (
        <div
          key={msg._id}
          className={`p-2 my-2 ${
            msg.sender === user._id ? "bg-blue-200" : "bg-gray-200"
          }`}
        >
          <p>{msg.content}</p>
        </div>
      ))}
    </div>
  );
};

export default MessageDisplayer;
