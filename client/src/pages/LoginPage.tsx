import React, { useState } from "react";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    alert("Login successful");
    // Handle sign up logic here
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div className="flex flex-col items-center justify-center h-lvh">
      <div className="flex flex-col items-center gap-4 p-4 bg-white rounded-xl shadow-lg">
        <h2>Login</h2>
        <form
          className="flex flex-col items-start gap-2 justify-center h-full "
          onSubmit={handleSubmit}
        >
         
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="rounded-xl border border-gray-300 ml-4"
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="rounded-xl border border-gray-300 ml-4"
            />
          </div>
          
          <button
            className="bg-primary px-12 py-3 rounded-xl w-full mt-7 justify-center text-white"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
