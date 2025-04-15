import React from "react";
import { UserCardProps } from "./UserCard.type";
import { Button } from "../../atoms/Button";

export const UserCard: React.FC<UserCardProps> = ({
  initials,
  name,
  email,
  status,
  dob,
  className,
}) => {
  return (
    <div
      className={`user-card ${className} flex flex-col p-4 rounded-lg shadow-lg bg-white dark:bg-gray-700 h-full min-h-[250px]`}
    >
      <div className="flex justify-center mb-4">
        <div className="bg-primary text-white text-lg font-semibold rounded-full w-12 h-12 flex items-center justify-center">
          {initials}
        </div>
      </div>
      <h2 className="font-bold mb-1 text-black dark:text-gray-100">{name}</h2>
      <p className="text-sm text-gray-600 dark:text-gray-200">Email: {email}</p>
      <p className="text-sm text-gray-600 dark:text-gray-200 capitalize">Status: {status}</p>
      <p className="text-sm text-gray-600 dark:text-gray-200">Date of Birth: {dob}</p>

      <div className="mt-6 flex justify-end gap-4 mt-auto">
        <Button variant="primary" className="dark:bg-primary-dark dark:text-white">Edit</Button>
        <Button variant="danger" className="dark:bg-red-500 dark:text-white">Delete</Button>
      </div>
    </div>
  );
};
