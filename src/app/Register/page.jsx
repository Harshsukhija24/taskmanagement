// Register.js
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  // Generate a unique userId using a timestamp and a random number
  const generateUserId = () => {
    const timestamp = Date.now().toString(36); // Convert current time to base-36
    const randomString = Math.random().toString(36).substring(2, 9); // Random part
    return timestamp + randomString;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (!name || !email || !password) {
        setError("All fields are necessary.");
        return;
      }

      // Register new user
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          userId: generateUserId(), // Include userId here
        }),
      });

      const data = await res.json();

      if (res.ok) {
        console.log("Registration successful:", data);
        router.push("/Login"); // Redirect to login page after successful registration
      } else {
        setError(data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Registration failed:", error);
      setError("An unexpected error occurred. Please try again.");
    }
  };
  return (
    <div
      className="h-full w-full bg-cover bg-center flex items-center absolute top-0 left-0"
      style={{
        backgroundImage:
          "url('https://i.pinimg.com/564x/d8/29/f8/d829f86b22c68f0283467144bbc6b959.jpg')",
      }}
    >
      <div className="container mx-auto flex justify-between p-4">
        {/* Left side: Additional content */}
        <div className="w-full md:w-1/2 p-8">
          <h1 className="text-4xl font-bold text-black mb-4">
            Welcome to Our Platform
          </h1>
          <p className="text-black text-lg">
            Start your journey with us and enjoy a seamless experience.
          </p>
        </div>
        {/* Right side: Registration form */}
        <div className="hidden md:block w-1/2 p-8">
          <h1 className="text-3xl font-bold mb-4 text-center">Register</h1>
          <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 font-bold mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-bold mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your email address"
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-gray-700 font-bold mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your password"
                required
              />
            </div>
            {error && <div className="mb-4 text-red-500 text-sm">{error}</div>}
            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="bg-black w-60 text-xl text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
