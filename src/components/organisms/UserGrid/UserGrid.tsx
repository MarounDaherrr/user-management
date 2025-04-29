import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSessionStore } from "../../../stores/sessionStore";
import { useDebouncedValue } from "../../../hooks/useDebouncedValue";
import { useQuery, useQueryClient } from "react-query";
import SearchInput from "../../atoms/SearchInput";
import { UserCard } from "../../molecules/UserCard/UserCard";
import { toast } from "react-toastify";

interface User {
  id: string;
  firstName: string;
  lastName?: string;
  email: string;
  status: "ACTIVE" | "LOCKED";
  dateOfBirth: string;
}

const fetchUsers = async (debouncedSearch: string, accessToken: string) => {
  const response = await fetch(`/api/users?search=${debouncedSearch}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  const data = await response.json();
  return data.result.data.users;
};

const UserGrid = () => {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebouncedValue(search, 400);
  const accessToken = useSessionStore((s) => s.accessToken);
  const logout = useSessionStore((s) => s.logout);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  if (!accessToken) {
    navigate("/login");
    return null;
  }

  const { data: users, isLoading, error } = useQuery(
    ["users", debouncedSearch, accessToken],
    () => fetchUsers(debouncedSearch, accessToken),
    {
      onError: () => {
        logout();
        navigate("/login");
      },
    }
  );

  const handleError = (error: unknown) => {
    if (error instanceof Error) {
      return error.message;
    } else {
      return "An unexpected error occurred.";
    }
  };

  return (
    <>
      <div className="p-6">
        <SearchInput value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      {isLoading ? (
        <div className="text-center text-lg">Loading users...</div>
      ) : error ? (
        <div className="text-center text-lg text-red-500">
          Error: {handleError(error)}
        </div>
      ) : (
        <div className="user-grid">
          {users?.length > 0 ? (
            users.map((user: User) => (
              <UserCard
                key={user.id}
                id={user.id}
                initials={(user.firstName[0] + (user.lastName?.[0] || "")).toUpperCase()}
                name={`${user.firstName} ${user.lastName || ""}`}
                email={user.email}
                status={user.status.toLowerCase() as "active" | "locked"}
                dob={user.dateOfBirth}
                onDelete={() => {
                  queryClient.invalidateQueries("users");
                  toast.success("User deleted successfully!");
                }}
              />
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500">
              No users found.
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default UserGrid;