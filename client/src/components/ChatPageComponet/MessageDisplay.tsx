import { useSelector } from "react-redux";

const MessageDisplayer = () => {
  const messages = useSelector((state: any) => state.chat.messages);
  const user = useSelector((state: any) => state.auth.user);
  const userId = user.id;

  return (
    <div className="flex-1 p-4 overflow-y-auto  w-full h-full">
      {messages.map((msg: any) => (
        <div
          key={msg._id}
          className={`flex p-2 my-2 ${
            msg.sender === user._id ? "justify-end" : "justify-start"
          }`}
        >
          <span
            className={`p-2 rounded-md ${
              msg.sender === userId
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-black"
            } max-w-xs`}
          >
            {msg.content}
          </span>
        </div>
      ))}
    </div>
  );
};

export default MessageDisplayer;
