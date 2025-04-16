import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSessionStore } from "../../../stores/sessionStore";
import SearchInput from "../../atoms/SearchInput";
import { UserCard } from "../../molecules/UserCard/UserCard";

interface User {
  id: string;
  firstName: string;
  lastName?: string;
  email: string;
  status: "ACTIVE" | "LOCKED";
  dateOfBirth: string;
}

const UserGrid = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const accessToken = useSessionStore((s) => s.accessToken);
  const logout = useSessionStore((s) => s.logout);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/users?search=${search}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        const data = await res.json();

        if (res.status === 401) {
          logout();
          navigate("/login");
          return;
        }

        if (res.ok) {
          setUsers(data.result.data.users);
        }
      } catch (err) {
        console.error("Failed to fetch users", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [search]);

  return (
    <>
      <div className="p-6">
        <SearchInput value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      {loading ? (
        <div className="text-center text-lg">Loading users...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 px-7 pb-11 w-full">
          {users.length > 0 ? (
            users.map((user) => (
              <UserCard
                key={user.id}
                initials={(user.firstName[0] + (user.lastName?.[0] || "")).toUpperCase()}
                name={`${user.firstName} ${user.lastName || ""}`}
                email={user.email}
                status={user.status.toLowerCase() as "active" | "locked"}
                dob={user.dateOfBirth}
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