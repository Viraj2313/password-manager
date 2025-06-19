import { useUser } from "../context/UserContext";
import ThemeToggle from "./ThemeToggle";
import { FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Navbar() {
  const { userId, setUserId, authLoading } = useUser();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("/api/logout", {}, { withCredentials: true });
      setUserId(null);
      navigate("/");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  // Show loading state while auth is being determined
  if (authLoading) {
    return (
      <div className="bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 shadow-2xl py-4 px-4 md:px-6">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <Link to="/">
            <h1 className="text-lg md:text-3xl font-bold text-gray-800 dark:text-white tracking-tight">
              Password Manager
            </h1>
          </Link>
          <div className="flex items-center gap-1 md:gap-2">
            {/* Loading skeleton for auth buttons */}
            <div className="flex md:gap-2 gap-1">
              <div className="bg-gray-300 dark:bg-gray-600 rounded-xl shadow px-4 py-2 md:min-w-[96px] min-w-[80px] animate-pulse h-9"></div>
              <div className="bg-gray-300 dark:bg-gray-600 rounded-xl shadow px-4 py-2 md:min-w-[96px] min-w-[80px] animate-pulse h-9"></div>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 shadow-2xl py-4 px-4 md:px-6">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <Link to="/">
          <h1 className="text-lg md:text-3xl font-bold text-gray-800 dark:text-white tracking-tight">
            Password Manager
          </h1>
        </Link>
        <div className="flex items-center gap-1 md:gap-2">
          {userId ? (
            <>
              <div
                className="border border-gray-300 rounded-full p-2 w-9 h-9 flex items-center justify-center bg-white dark:bg-gray-800"
                title="Profile"
              >
                <FaUser size={16} />
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white rounded-xl shadow px-4 py-2 hover:bg-red-600 hover:scale-105 transition-transform duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-400 hover:cursor-pointer"
              >
                Logout
              </button>
            </>
          ) : (
            <div className="flex md:gap-2 gap-1">
              <Link to="/login">
                <button className="bg-blue-600 text-white rounded-xl shadow px-4 py-2 md:min-w-[96px] min-w-[80px] hover:bg-blue-700 hover:scale-105 transition-transform duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400 hover:cursor-pointer">
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button className="bg-blue-600 text-white rounded-xl shadow px-4 py-2 md:min-w-[96px] min-w-[80px] hover:bg-blue-700 hover:scale-105 transition-transform duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400 hover:cursor-pointer">
                  Sign up
                </button>
              </Link>
            </div>
          )}
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
