import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "../components/pages/Login";
import Dashboard from "../components/pages/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import AuthenticationRoute from "./AuthenticationRoute";
import AddUser from "../components/pages/Dashboard/UserManagement/AddUserForm";
import EditUser from "../components/pages/Dashboard/UserManagement/EditUserForm";



const routes = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route path="/login" element={<AuthenticationRoute><Login /></AuthenticationRoute>} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      
      <Route path="*" element={<Navigate to="/login" replace />} />

      <Route
        path="/dashboard/new"
        element={
          <ProtectedRoute>
            <AddUser />
          </ProtectedRoute>
        }
      />

      <Route path="/dashboard/edit/:id" element={<ProtectedRoute><EditUser /></ProtectedRoute>} />

    </>
  )
);

export default routes;