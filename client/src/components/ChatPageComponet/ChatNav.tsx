import { Bell, Users, Search, Phone, Ellipsis } from "lucide-react";
import ChatLists from "./ChatLists";
import DropDownSearch from "../DropDownSearch";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { setSearchTerm, searchUsers } from "../../redux/slices/searchSlice";
import { useEffect } from "react";

export const ChatNav = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { searchTerm, searchResults, loading, error } = useSelector(
    (state: RootState) => state.search
  );

  useEffect(() => {
    if (searchTerm.trim()) {
      dispatch(searchUsers(searchTerm));
    }
  }, [searchTerm, dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchTerm(e.target.value));
  };

  const handleSelectUser = (user: { _id: string; name: string }) => {
    console.log("Selected user:", user);
    // Handle user selection (e.g., open chat)
  };

  console.log(error);

  return (
    <div className="flex-1 flex flex-col justify-between py-7">
      <div className="flex flex-col justify-center items-center px-7">
        <div className="w-full flex justify-between items-center gap-4 mb-10 ">
          <div>
            <div className="flex items-center px-3 py-2 border border-gray-200 rounded-full">
              <input
                type="text"
                placeholder="search a friend..."
                className="border-none focus:ring-0 focus:outline-none"
                value={searchTerm}
                onChange={handleChange}
              />
            </div>
            {/* loading and error */}
            {loading && <div>Loading...</div>}
            {error && <div className="text-red-500">{error}</div>}

            {/* Show the dropdown list when there are search results */}
            {searchTerm && searchResults?.length > 0 && (
              <DropDownSearch
                searchResults={searchResults}
                onSelectUser={handleSelectUser}
              />
            )}
          </div>
          <Ellipsis />
        </div>
        <div className="w-full  flex flex-col justify-center gap-2">
          <h2 className="text-lg font-semibold mb-4">Friends</h2>
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
