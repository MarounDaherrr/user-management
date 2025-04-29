import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useSessionStore } from "../../../stores/sessionStore";
import { toast } from "react-toastify"; 

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const setSession = useSessionStore((s) => s.setSession); 
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      setError("Both fields are required.");
      return;
    }

    setLoading(true); 
    setError(null);    

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),  
      });

      const data = await res.json(); 

      if (res.ok) {
        const { accessToken, expiresIn } = data.result?.data || {}; 

        if (!accessToken || !expiresIn) {
          setError(data?.result?.message || "Invalid login response.");
          return;
        }

        setSession(accessToken, expiresIn);

        toast.success("Login successful!");
        navigate("/dashboard");
      } else {
        setError(data?.result?.message || "Login failed. Please check your credentials.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);  
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-6 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-center text-xl font-semibold mb-4 text-gray-800 dark:text-white">
          Login
        </h2>

        {error && (
          <p className="text-red-500 text-center mb-4 text-sm">{error}</p>
        )}

        <div className="mb-4">
          <label className="block mb-1 text-sm text-gray-700 dark:text-white">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-primary"
            placeholder="Enter your email"
            autoComplete="email"
            autoFocus
          />
        </div>

        <div className="mb-4 relative">
          <label className="block mb-1 text-sm text-gray-700 dark:text-white">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-primary pr-10"
            placeholder="Enter your password"
            autoComplete="current-password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-8 right-3 text-gray-600"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;