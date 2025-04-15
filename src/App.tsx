import React, { useEffect } from "react";

import NavBar from "./components/organisms/NavBar";
import UserGrid from "./components/organisms/UserGrid";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
      <NavBar />
      <UserGrid />
    </div>
  );
}

export default App;
