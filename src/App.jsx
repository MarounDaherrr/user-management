import React from "react";
import NavBar from "./components/NavigationBar";
import UserCard from "./components/UserCard";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      <UserCard />
    </div>
  );
}

export default App;
