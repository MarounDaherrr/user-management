import React, { useEffect } from "react"; 
import { ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 
import NavBar from "./components/organisms/NavBar";
import UserGrid from "./components/organisms/UserGrid";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={true} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      
      <NavBar />
      <UserGrid />
    </div>
  );
}

export default App;