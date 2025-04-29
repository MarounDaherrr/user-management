import React from "react";
import { useNavigate } from "react-router-dom";
import { UserCardProps } from "./UserCard.type";
import { Button } from "../../atoms/Button";
import { useSessionStore } from "../../../stores/sessionStore";

export const UserCard: React.FC<UserCardProps> = ({
  id,
  initials,
  name,
  email,
  status,
  dob,
  className,
  onDelete,
}) => {
  const navigate = useNavigate();
  const accessToken = useSessionStore((s) => s.accessToken);

  const handleEdit = () => {
    navigate(`/dashboard/edit/${id}`);
  };

  const handleDelete = async () => {
    const confirmed = window.confirm("Are you sure you want to delete this user?");
    if (confirmed) {
      try {
        if (!accessToken) {
          alert("You must be logged in to delete a user.");
          return;
        }

        const response = await fetch(`/api/users/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to delete user.");
        }

        alert("User deleted successfully!");
        onDelete();
      } catch (error: unknown) {
        if (error instanceof Error) {
          alert(error.message);
        } else {
          alert("Something went wrong while deleting the user.");
        }
      }
    }
  };

  return (
    <div className={`user-card ${className} flex flex-col p-4 rounded-lg shadow-lg bg-white dark:bg-gray-800 h-full min-h-[250px]`}>
      <div className="flex justify-center mb-4">
        <div className="bg-primary text-white text-lg font-semibold rounded-full w-12 h-12 flex items-center justify-center">
          {initials}
        </div>
      </div>
      <h2 className="font-bold mb-1 text-black dark:text-gray-100">{name}</h2>
      <p className="text-sm text-gray-600 dark:text-gray-300">Email: {email}</p>
      <p className="text-sm text-gray-600 dark:text-gray-300 capitalize">Status: {status}</p>
      <p className="text-sm text-gray-600 dark:text-gray-300">Date of Birth: {dob}</p>

      <div className="mt-4 flex justify-end gap-2">
        <Button
          variant="primary"
          className="dark:bg-primary-dark dark:text-white"
          onClick={handleEdit}
        >
          Edit
        </Button>
        <Button
          variant="danger"
          className="dark:bg-red-600 dark:text-white"
          onClick={handleDelete}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};