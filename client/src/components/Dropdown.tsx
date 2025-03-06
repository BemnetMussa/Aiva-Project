import { User } from "lucide-react";
import { useEffect, useState } from "react";
import { logout } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const DropdownButton = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const handleLogOut = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="relative">
      <button
        type="button"
        className="flex justify-center border-none"
        onClick={toggleDropdown}
      >
        <User className="w-5 h-5" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-3 w-56 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="py-1 mt-8">
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              // onClick={closeDropdown}
            >
              View
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              // onClick={closeDropdown}
            >
              Edit
            </a>
            <button
              className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left cursor-pointer"
              onClick={handleLogOut}
            >
              logout
            </button>
          </div>
          <a
            className="px-4 py-2 text-sm text-gray-700 rounded-md hover:bg-gray-100 absolute top-0 right-0"
            onClick={closeDropdown}
          >
            x
          </a>
        </div>
      )}
    </div>
  );
};

export default DropdownButton;
