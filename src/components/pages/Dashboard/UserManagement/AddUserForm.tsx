import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";  
import { z } from "zod";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";  
import NavBar from "../../../organisms/NavBar";
import { useSessionStore } from "../../../../stores/sessionStore";

const userSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().optional(),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  dateOfBirth: z.string().min(1, "Date of Birth is required"),
  status: z.enum(["active", "locked"], {
    errorMap: (issue, _ctx) => {
      if (issue.code === "invalid_type") {
        return { message: "Status must be active or locked" };
      }
      return { message: "Invalid status" };
    },
  }),
});

type UserForm = z.infer<typeof userSchema>;

const AddUser = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<UserForm>({
    resolver: zodResolver(userSchema),
  });

  const navigate = useNavigate();
  const accessToken = useSessionStore((s) => s.accessToken);

  const mutation = useMutation(async (user: UserForm) => {
    if (!accessToken) {
      toast.error("You need to log in first.");
      navigate("/login");
      return;
    }

    const response = await fetch("/api/users", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error("Failed to add user.");
    }

    return response;
  });

  const onSubmit: SubmitHandler<UserForm> = async (data) => {
    try {
      const response = await mutation.mutateAsync(data);

      if (response && response.ok) {
        toast.success("User added successfully!");
        navigate("/dashboard");
      } else {
        const errorData = await response?.json();
        toast.error(errorData?.result?.message || "Failed to add user.");
      }
    } catch (error) {
      toast.error("Error occurred while adding user.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <NavBar />

      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full sm:w-96">
          <h1 className="text-xl font-semibold mb-4 text-center text-gray-800 dark:text-white">Add New User</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block mb-1 text-sm text-gray-700 dark:text-white">First Name</label>
              <input 
                {...register("firstName")} 
                className={`w-full p-2 border rounded ${errors.firstName ? "border-red-500" : "border-gray-300"} dark:bg-gray-700 dark:text-white`} 
                placeholder="First Name" 
              />
              {errors.firstName && <p className="text-red-500">{errors.firstName.message}</p>}
            </div>

            <div>
              <label className="block mb-1 text-sm text-gray-700 dark:text-white">Last Name (Optional)</label>
              <input 
                {...register("lastName")} 
                className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" 
                placeholder="Last Name" 
              />
            </div>

            <div>
              <label className="block mb-1 text-sm text-gray-700 dark:text-white">Email</label>
              <input 
                {...register("email")} 
                className={`w-full p-2 border rounded ${errors.email ? "border-red-500" : "border-gray-300"} dark:bg-gray-700 dark:text-white`} 
                placeholder="Email" 
              />
              {errors.email && <p className="text-red-500">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block mb-1 text-sm text-gray-700 dark:text-white">Date of Birth</label>
              <input 
                type="date" 
                {...register("dateOfBirth")} 
                className={`w-full p-2 border rounded ${errors.dateOfBirth ? "border-red-500" : "border-gray-300"} dark:bg-gray-700 dark:text-white`} 
              />
              {errors.dateOfBirth && <p className="text-red-500">{errors.dateOfBirth.message}</p>}
            </div>

            <div>
              <label className="block mb-1 text-sm text-gray-700 dark:text-white">Status</label>
              <select {...register("status")} className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white">
                <option value="active">Active</option>
                <option value="locked">Locked</option>
              </select>
              {errors.status && <p className="text-red-500">{errors.status.message}</p>}
            </div>

            <div>
              <button 
                type="submit" 
                disabled={mutation.isLoading} 
                className="w-full bg-blue-500 text-white py-2 rounded mt-4"
              >
                {mutation.isLoading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddUser;