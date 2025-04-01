import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Chat, setActiveChat } from "../../redux/slices/chatSlice";
import { format } from "date-fns";

export default function ChatLists() {
  const dispatch = useDispatch();
  const chats = useSelector((state: RootState) => state.chat.chats);
  const user = useSelector((state: RootState) => state.auth.user);

  console.log(chats, "console logging chats");

  return (
    <div className="max-h-[400px] overflow-y-auto px-2">
      {chats?.map((chat: Chat) => {
        if (!chat) return null; // Defensive check

        return (
          <div
            className="flex justify-between items-center gap-10 px-3 py-2 rounded-xl hover:bg-cyan-100 hover:cursor-pointer"
            key={chat?._id} // No need for chat.chat._id anymore
            onClick={() => dispatch(setActiveChat(chat?._id))}
          >
            <div className="flex items-center gap-1">
              <img
                src={
                  chat?.user1 && chat?.user2
                    ? chat.user1._id === user?._id
                      ? chat.user2?.image || "/default-avatar.png"
                      : chat.user1?.image || "/default-avatar.png"
                    : "/default-avatar.png"
                }
                className="w-12 h-12 rounded-full"
                alt="User Avatar"
              />
              <span className="text-sm font-medium">
                {chat?.user1 && chat?.user2
                  ? chat.user1._id === user?._id
                    ? chat.user2?.name || "Unknown User"
                    : chat.user1?.name || "Unknown User"
                  : "Unknown User"}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-medium text-xs text-gray-600">
                {chat.createdAt
                  ? format(new Date(chat.createdAt), "MMM d, yyyy")
                  : "Unknown Date"}
              </span>
              <span className="font-medium text-xs text-gray-600">
                {chat.createdAt
                  ? format(new Date(chat.createdAt), "h:mm a")
                  : "Unknown Date"}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
