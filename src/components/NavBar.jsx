import { Moon } from "lucide-react";

const NavBar = () => (
  <nav className="bg-primary text-white px-6 py-4 flex justify-between items-center shadow">
    <h1 className="text-xl font-semibold">User Management</h1>
    <div className="flex items-center gap-3">
      <button className="bg-white text-primary px-5 py-2 rounded text-base font-medium hover:bg-gray-100 transition">
        Create User
      </button>
      <button className="bg-red-500 text-white px-5 py-2 rounded text-base font-medium hover:bg-red-600 transition">
        Logout
      </button>
      <button className="ml-2 p-2 rounded hover:bg-white hover:text-primary transition">
        <Moon size={20} />
      </button>
    </div>
  </nav>
);

export default NavBar;
