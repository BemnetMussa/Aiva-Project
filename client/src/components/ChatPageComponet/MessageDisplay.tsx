import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const MessageDisplayer = () => {
  const { messages, activeChat } = useSelector(
    (state: RootState) => state.chat
  );
  const user = useSelector((state: RootState) => state.auth.user);

  const chatMessages = activeChat ? messages[activeChat] || [] : [];

  return (
    <div className="flex-1 p-4 overflow-y-auto  w-full h-full">
      {chatMessages.map((msg: any) => (
        <div
          key={msg._id}
          className={`flex p-2 my-2 ${
            msg.sender === user?._id ? "justify-end" : "justify-start"
          }`}
        >
          <span
            className={`p-2 rounded-md ${
              msg.sender === user?._id
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-black"
            } max-w-xs`}
          >
            {msg.content}zjznxkjZ
          </span>
        </div>
      ))}
    </div>
  );
};

export default MessageDisplayer;
