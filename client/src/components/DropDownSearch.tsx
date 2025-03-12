interface User {
  _id: string;
  name: string;
  email: string;
  image: string;
}

interface DropdownListProps {
  searchResults: User[];
  onSelectUser: (user: User) => void;
}

const DropDownSearch: React.FC<DropdownListProps> = ({
  searchResults,
  onSelectUser,
}) => {
  return (
    <div className="absolute mt-2 bg-white shadow-lg rounded-lg">
      {searchResults?.length > 0 ? (
        <ul className="max-h-60 overflow-y-auto max-w-64">
          {searchResults.map((user) => (
            <li
              key={user._id}
              className="p-3 hover:bg-gray-100 cursor-pointer"
              onClick={() => onSelectUser(user)}
            >
              <div className="flex items-center">
                {/* Optionally, display a user avatar */}
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                  {user.image || (
                    <span className="text-sm">
                      {user.name[0].toUpperCase()}
                    </span>
                  )}
                </div>
                <div>
                  <div className="font-semibold">{user.name}</div>
                  <div className="text-sm text-gray-500">{user.email}</div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="p-3 text-center text-gray-500">No users found</div>
      )}
    </div>
  );
};

export default DropDownSearch;
