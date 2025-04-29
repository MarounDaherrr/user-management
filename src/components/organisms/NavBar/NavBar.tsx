import React from "react";
import { Moon, Sun } from "lucide-react";
import { useThemeStore } from "../../../stores/themeStore";
import { useSessionStore } from "../../../stores/sessionStore";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const { theme, toggleTheme } = useThemeStore();
  const logout = useSessionStore((s) => s.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleCreateUser = () => {
    navigate("/dashboard/new"); 
  };

  return (
    <nav className="bg-primary text-white px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-medium">User Management</h1>
      <div className="flex items-center gap-4">
        <button 
          onClick={handleCreateUser} 
          className="bg-white text-primary px-5 py-2 rounded text-base"
        >
          Create User
        </button>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-5 py-2 rounded text-base"
        >
          Logout
        </button>
        <button
          onClick={toggleTheme}
          className="ml-2 p-2 rounded hover:bg-white hover:text-primary"
        >
          {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
        </button>
      </div>
    </nav>
  );
};

export default NavBar;