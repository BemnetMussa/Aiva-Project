import { Ellipsis, Mic, Paperclip, Smile } from "lucide-react";
export const MessageInput = () => {
  return (
    <div className="flex-1 mr-40 ml-5 flex items-center gap-5">
      <div className="flex-2 flex items-center gap-3 bg-gray-100 px-3 py-2 border border-gray-100 rounded-full">
        <Smile size={18} />
        <input
          type="text"
          className="w-full  border-none focus:ring-0 focus:outline-none"
        />
      </div>
      <Mic className="text-cyan-500" />
      <Paperclip className="text-cyan-500" />
      <Ellipsis className="text-cyan-500" />
    </div>
  );
};
