import {
  Bell,
  Users,
  Phone,
  Ellipsis,
  Search,
  Settings,
  Dot,
  Video,
  Mic,
  Paperclip,
  Smile,
} from "lucide-react";
import PeopleNavChat from "../components/PeopleNavChat";

export default function ChatPage() {
  return (
    <div className="h-screen w-full flex justify-between">
      {/* left nav */}
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
            <PeopleNavChat />
            <PeopleNavChat />
            <PeopleNavChat />
            <PeopleNavChat />
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

      {/* right content */}
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
        <div className="flex-7 "></div>

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
      </div>
    </div>
  );
}
