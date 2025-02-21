import { Bell, Users, Search, Phone, Ellipsis } from "lucide-react";
import ChatLists from "./ChatLists";

export const ChatNav = () => {
  return (
    <div className="flex-1 flex flex-col justify-between py-7">
      <div className="flex flex-col justify-center items-center px-7">
        <div className="w-full flex justify-between items-center gap-4 mb-10 ">
          <div className="flex items-center px-3 py-2 border border-gray-200 rounded-full">
            <input
              type="text"
              placeholder="Persons, Groups, Chats"
              className="border-none focus:ring-0 focus:outline-none"
            />
            <Search size={18} color="gray" />
          </div>
          <Ellipsis />
        </div>
        <div className="w-full  flex flex-col justify-center gap-2">
          <h2 className="text-lg font-semibold mb-4">Friends</h2>
          <ChatLists />
          <ChatLists />
          <ChatLists />
          <ChatLists />
        </div>
      </div>

      <div className="flex justify-evenly text-[.8rem] font-semibold text-gray-700 tracking-wider">
        <button className="flex flex-col cursor-pointer gap-3 justify-center items-center">
          <Bell className="text-cyan-500" />
          notification
        </button>
        <button className="flex flex-col cursor-pointer gap-3 justify-center items-center">
          <Phone className="text-cyan-500" />
          phone
        </button>
        <button className="flex flex-col cursor-pointer gap-3 justify-center items-center">
          <Users className="text-cyan-500" />
          contact
        </button>
      </div>
    </div>
  );
};
