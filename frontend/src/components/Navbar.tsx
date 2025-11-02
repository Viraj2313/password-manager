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

  // Loading state skeleton
  if (authLoading) {
    return (
      <div className="backdrop-blur-md bg-white/40 dark:bg-gray-900/40 border-b border-white/20 dark:border-gray-800/40 shadow-md py-4 px-4 md:px-6">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <Link to="/">
            <h1 className="text-lg md:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
              Password Manager
            </h1>
          </Link>
          <div className="flex items-center gap-2">
            <div className="flex gap-2">
              <div className="bg-gray-300/60 dark:bg-gray-700/60 rounded-xl px-4 py-2 md:min-w-[96px] min-w-[80px] animate-pulse h-9"></div>
              <div className="bg-gray-300/60 dark:bg-gray-700/60 rounded-xl px-4 py-2 md:min-w-[96px] min-w-[80px] animate-pulse h-9"></div>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="backdrop-blur-md bg-white/40 dark:bg-gray-900/40 border-b border-white/20 dark:border-gray-800/40 shadow-md py-4 px-4 md:px-6">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <Link to="/">
          <h1 className="text-lg md:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
            Password Manager
          </h1>
        </Link>
        <div className="flex items-center gap-2">
          {userId ? (
            <>
              <div
                className="border border-gray-300/50 dark:border-gray-600/50 rounded-full p-2 w-9 h-9 flex items-center justify-center bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm"
                title="Profile"
              >
                <FaUser size={16} />
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-500/80 text-white rounded-xl shadow px-4 py-2 hover:bg-red-600 hover:scale-105 transition-transform duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-400"
              >
                Logout
              </button>
            </>
          ) : (
            <div className="flex gap-2">
              <Link to="/login">
                <button className="bg-blue-600/80 text-white rounded-xl shadow px-4 py-2 md:min-w-[96px] min-w-[80px] hover:bg-blue-700 hover:scale-105 transition-transform duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400">
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button className="bg-blue-600/80 text-white rounded-xl shadow px-4 py-2 md:min-w-[96px] min-w-[80px] hover:bg-blue-700 hover:scale-105 transition-transform duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400">
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
