import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { setChats, setActiveChat } from "../../redux/Slice/chatSlice";

export default function ChatLists() {
  const dispatch = useDispatch();
  const chats = useSelector((state: RootState) => state.chat.chats);
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    fetch(`http://localhost:5000/api/chat/${user}`)
      .then((res) => res.json())
      .then((data) => dispatch(setChats(data)))
      .catch((err) => console.error("Error fetching chats", err));
  }, [dispatch, user]);

  return (
    <div>
      {chats.map((chat: any) => (
        <div
          className="flex justify-between items-center gap-10 px-3 py-2 rounded-xl hover:bg-cyan-100 hover:cursor-pointer"
          key={chat._id}
          onClick={() => dispatch(setActiveChat(chat._id))}
        >
          <div className="flex items-center gap-1">
            <img
              src={chat._id === user._id ? user.image : "../public/logo.png"}
              className="w-12 h-12 rounded-full"
            />
            <span className="text-sm font-medium">
              {chat.user1._id === user._id ? chat.user2.name : chat.user1.name}
            </span>
          </div>
          <span className="font-medium">{chat.createdAt}</span>
        </div>
      ))}
    </div>
  );
}
