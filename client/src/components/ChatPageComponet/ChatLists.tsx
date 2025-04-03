import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { setActiveChat } from "../../redux/slices/chatSlice";
import { format } from "date-fns";

export default function ChatLists() {
  const dispatch = useDispatch();
  const chats = useSelector((state: RootState) => state.chat.chats);
  const user = useSelector((state: RootState) => state.auth.user);

  console.log(chats);

  return (
    <div className="max-h-[450px] overflow-y-auto px-2">
      {chats?.map((chat) => {
        if (!chat) return null;

        const otherUser =
          chat.user1._id === user?._id ? chat.user2 : chat.user1;
        return (
          <div
            key={chat._id}
            className="flex justify-between items-center gap-10 px-3 py-2 rounded-xl hover:bg-cyan-100 cursor-pointer"
            onClick={() => dispatch(setActiveChat(chat._id))}
          >
            <div className="flex items-center gap-1">
              <img
                src={otherUser?.image || "/default-avatar.png"}
                className="w-12 h-12 rounded-full"
                alt="User Avatar"
              />
              <span className="text-sm font-medium">
                {otherUser?.name || "Unknown User"}
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
                  : "Unknown Time"}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
