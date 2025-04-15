import React from "react";
import NavBar from "../../components/organisms/NavBar";
import UserGrid from "../../components/organisms/UserGrid";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <NavBar />
      <UserGrid />
    </div>
  );
};

export default Dashboard;
