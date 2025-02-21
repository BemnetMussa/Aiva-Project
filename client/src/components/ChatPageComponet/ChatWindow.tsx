import { Phone, Settings, Dot, Video } from "lucide-react";
import { MessageInput } from "./MessageInput";
import MessageDisplayer from "./MessageDisplay";

export const ChatWindow = () => {
  return (
    <div className="flex-3 flex flex-col shadow-2xl">
      <div className="flex-1 flex justify-between items-center mx-5">
        <div className="flex  justify-between items-center">
          <Dot size={60} className="text-green-600" />
          <span className="font-semibold tracking-wider">Bemment Mussa</span>
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
      <div className="flex-7 ">
        <MessageDisplayer />
      </div>

      {/* message input */}
      <MessageInput />
    </div>
  );
};
