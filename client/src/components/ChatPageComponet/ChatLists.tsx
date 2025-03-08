import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Chat, setActiveChat } from "../../redux/slices/chatSlice";
import { format } from "date-fns";
export default function ChatLists() {
  const dispatch = useDispatch();
  const chats = useSelector((state: RootState) => state.chat.chats);
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <div>
      {chats.map((chat: Chat) => (
        <div
          className="flex justify-between items-center gap-10 px-3 py-2 rounded-xl hover:bg-cyan-100 hover:cursor-pointer"
          key={chat._id}
          onClick={() => dispatch(setActiveChat(chat._id))}
        >
          <div className="flex items-center gap-1">
            <img
              src={
                chat.user1._id === user._id
                  ? chat.user2.image
                  : "../public/logo.png"
              }
              className="w-12 h-12 rounded-full"
              alt=""
            />
            <span className="text-sm font-medium">
              {chat.user1._id === user._id ? chat.user2.name : chat.user1.name}
            </span>
          </div>
          <span className="font-medium">
            {format(new Date(chat.createdAt), "MMM d, yyyy h:mm a")}
          </span>
        </div>
      ))}
    </div>
  );
}
