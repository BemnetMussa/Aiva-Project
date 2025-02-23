import React, { useState } from "react";
import { Link, Navigate, redirect } from "react-router-dom";
import { EyeOff } from "lucide-react";
import GoogleAuth from "../components/GoogleAuth";
import { useDispatch } from "react-redux";
import { loginFailed, loginSuccess } from "../redux/slices/authSlice";

const LoginPage: React.FC = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      console.log(response);
      dispatch(loginSuccess({ user: data.user, token: data.token }));
      setRedirect(true);
    } else {
      dispatch(loginFailed({ error: data.error }));
    }
  };

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex items-center justify-center h-lvh py-6 bg-gray-50">
      <div className="flex justify-center px-4 py-10 bg-white rounded-xl shadow-lg w-5/12 ">
        <div className="flex flex-col justify-center items-centers w-3/4 gap-8">
          <div className="flex flex-col justify-center items-center">
            <h2 className="text-2xl">Log in</h2>
            <p className="text-sm">
              Don’t have an acount?
              <Link to="/signup" className="pl-1">
                Signup
              </Link>
            </p>
          </div>
          {/* google or facebook auth  */}

          <GoogleAuth />

          {/* giving options */}
          <div className="flex justify-center items-center space-x-2 mt-5 w-full text-sm">
            <hr className="w-3/12 h-2 border-gray-500 mt-2" />
            <p>Or continue with email</p>
            <hr className="w-3/12 h-2 border-gray-500 mt-2" />
          </div>

          {/* email form */}

          <form
            className="flex flex-col items-start gap-4 justify-center h-full mt-4 w-full text-sm"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col w-full space-y-1">
              <label className="">Email adress or username</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="rounded-xl border border-gray-300 w-full h-9"
              />
            </div>
            <div className="flex flex-col w-full space-y-1">
              <span className="flex justify-between">
                <label className="">Password</label>
                <span className="flex justify-center items-center gap-1 ">
                  <EyeOff size={16} /> Hide
                </span>
              </span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="rounded-xl border border-gray-300 w-full h-9"
              />
            </div>

            <button
              className="bg-primary-color px-12 py-3 rounded-xl w-full mt-5 justify-center text-white"
              type="submit"
              onClick={handleSubmit}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
