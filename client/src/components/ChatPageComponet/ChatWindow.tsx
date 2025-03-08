import { Phone, Settings, Dot, Video, MessageCircle } from "lucide-react";
import { MessageInput } from "./MessageInput";
import MessageDisplayer from "./MessageDisplay";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

export const ChatWindow = () => {
  const { activeChat } = useSelector((state: RootState) => state.chat);
  const user = useSelector((state: RootState) => state.auth.user);

  console.log(user);
  return (
    <div className="flex-3 flex flex-col shadow-2xl">
      <div className="flex-1 flex justify-between items-center mx-5">
        <div className="flex  justify-between items-center">
          <Dot size={60} className="text-green-600" />
          <span className="font-semibold tracking-wider">{user}</span>
          <Settings size={18} className="ml-4" />
        </div>
        <div className="flex justify-between items-center gap-5 text-cyan-500">
          <button className="cursor-pointer">
            <Phone />
          </button>
          <button className="cursor-pointer">
            <Video />
          </button>
        </div>
      </div>
      <div className="flex-7">
        {activeChat ? (
          <MessageDisplayer />
        ) : (
          <div className="flex justify-center items-center w-full h-full">
            <div className="flex flex-col items-center justify-center gap-8">
              <MessageCircle size={50} className="text-cyan-600" />
              <span className="text-2xl font-bold text-gray-800">
                Send Messages
              </span>
            </div>
          </div>
        )}
      </div>

      {/* message input */}
      <MessageInput />
    </div>
  );
};
