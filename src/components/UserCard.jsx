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

  const filteredUsers = usersData.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="px-6 py-4">
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-64 p-2 border border-gray-300 rounded"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-8 py-4">
        {filteredUsers.map((user, i) => (
          <div key={i} className="bg-white shadow-md p-4 rounded-lg flex flex-col justify-between h-full">
            <div>
              <div className="flex justify-center mb-4">
                <div className="bg-primary text-white text-lg font-semibold rounded-full w-12 h-12 flex items-center justify-center">
                  {user.initials}
                </div>
              </div>
              <h2 className="font-bold mb-1">{user.name}</h2>
              <p className="text-sm text-gray-600">Email: {user.email}</p>
              <p className="text-sm text-gray-600 capitalize">Status: {user.status}</p>
              <p className="text-sm text-gray-600">Date of Birth: {user.dob}</p>
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button className="bg-primary text-white px-4 py-1 rounded">Edit</button>
              <button className="bg-red-500 text-white px-4 py-1 rounded">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default UserCard;
