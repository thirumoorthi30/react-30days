import { Link, useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { userContext, themeContext } from "../../App";

let userLabel = "Thiru";

export default function NavBar() {
  const { theme, toggleTheme } = useContext(themeContext);
  const { user, handleLogout } = useContext(userContext);
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const isActive = (path) => location.pathname === path;
  const getInitial = (name) => name?.charAt(0)?.toUpperCase() || "U";

  const isDark = theme === "dark";

  return (
    <nav className="bg-violet-800/90 backdrop-blur-md sticky top-0 z-50 shadow-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">

          <Link
            to="/"
            className="text-white font-bold text-xl sm:text-2xl hover:text-yellow-300 transition"
          >
            React-30Days
          </Link>

          <div className="flex items-center space-x-6">

            {isActive("/") ? (
              <button
                hidden
                className="px-3 py-2 rounded-md text-sm sm:text-base font-medium bg-yellow-700 text-white cursor-not-allowed opacity-70"
              >
                Home
              </button>
            ) : (
              <Link
                to="/"
                className="px-3 py-2 rounded-md text-sm sm:text-base font-medium text-gray-300 hover:bg-yellow-700 hover:text-white transition-colors duration-200"
              >
                Home
              </Link>
            )}

            <button
              onClick={toggleTheme}
              className="w-14 h-7 flex items-center bg-gray-300 dark:bg-gray-700 rounded-full p-1 relative transition duration-300"
              title={theme === "light" ? "Dark Mode" : "Light Mode"}
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center bg-yellow-400 dark:bg-gray-300 text-black transition-all duration-500 transform ${
                  isDark ? "translate-x-7 rotate-180" : "translate-x-0 rotate-0"
                }`}
              >
                {isDark ? "🌙" : "☀️"}
              </div>
            </button>

            <div className="relative">
              {user ? (
                <>
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-10 h-10 bg-yellow-600 text-white rounded-full flex items-center justify-center font-semibold hover:bg-yellow-700 transition"
                  >
                    {getInitial(user.name || userLabel)}
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-lg py-2">
                      <div className="px-4 py-2 text-gray-800 border-b font-medium">
                        {user.name || userLabel}
                      </div>

                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Profile
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="space-x-4">
                  <Link
                    to="/login"
                    className="text-gray-300 hover:bg-yellow-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-yellow-700 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-yellow-800"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </nav>
  );
}
