import React, { useState } from "react";

const usersData = [
  { initials: "JD", name: "John Doe", email: "john.doe@example.com", status: "active", dob: "1990-05-15" },
  { initials: "JS", name: "Jane Smith", email: "jane.smith@example.com", status: "locked", dob: "1988-10-22" },
  { initials: "AJ", name: "Alice Johnson", email: "alice.johnson@example.com", status: "active", dob: "1995-02-10" },
  { initials: "B", name: "Bob", email: "bob.martin@example.com", status: "locked", dob: "1980-08-05" },
  { initials: "CB", name: "Charlie Brown", email: "charlie.brown@example.com", status: "active", dob: "1992-11-30" },
  { initials: "DL", name: "David Lee", email: "david.lee@example.com", status: "locked", dob: "1987-07-14" },
  { initials: "E", name: "Eve", email: "eve.green@example.com", status: "active", dob: "1993-09-21" },
  { initials: "FW", name: "Frank White", email: "frank.white@example.com", status: "active", dob: "1994-01-25" },
  { initials: "GB", name: "Grace Black", email: "grace.black@example.com", status: "locked", dob: "1985-03-17" },
  { initials: "H", name: "Hannah", email: "hannah.purple@example.com", status: "active", dob: "1996-12-03" },
];

const UserCard = () => {
  const [search, setSearch] = useState("");

  const filteredUsers = usersData.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      {/* Search Input */}
      <div className="mb-5">
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-xs p-2 border border-gray-300 rounded"
        />
      </div>

      {/* User Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredUsers.map((user, index) => (
          <div
            key={index}
            className="bg-white shadow p-4 rounded-lg flex flex-col justify-between h-full"
          >
            <div>
              <div className="flex justify-center mb-4">
                <div className="bg-primary text-white font-bold text-lg rounded-full w-12 h-12 flex items-center justify-center">
                  {user.initials || "?"}
                </div>
              </div>
              <h2 className="font-semibold mb-1">{user.name}</h2>
              <p className="text-sm text-gray-600">Email: {user.email}</p>
              <p className="text-sm text-gray-600">
                Status:{" "}
                <span className={user.status === "active" ? "text-green-600" : "text-gray-500"}>
                  {user.status}
                </span>
              </p>
              <p className="text-sm text-gray-600">Date of Birth: {user.dob}</p>
            </div>

            <div className="mt-4 flex justify-end gap-2">
              <button className="bg-primary text-white px-4 py-1 rounded text-sm">Edit</button>
              <button className="bg-red-500 text-white px-4 py-1 rounded text-sm">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserCard;
