import { EyeOff } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import GoogleAuth from "../components/GoogleAuth";

const SignupPage: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [agree, setAgree] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();


    const response = await fetch("http://localhost:5000/api/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        dob,
        gender,
        agree,
      }),
    });

    console.log(response);

    if (response.ok) {
      alert("Signup successful!");
    } else {
      alert("Signup failed!");
    }
  };

  return (
    <div className="flex items-center justify-center py-6 bg-gray-50">
      <div className="flex justify-center px-4 bg-white rounded-xl shadow-lg w-5/12 py-8">
        <div className="flex flex-col justify-center items-centers w-3/4 gap-8">
          <div className="flex justify-center items-center text-2xl mb-5 mt-4">
            <h2 className="font-semibold">
              Sign up for free and get your home
            </h2>
          </div>

          {/* google or facebook auth  */}
          <GoogleAuth />

          {/* giving options */}
          <div className="flex justify-center items-center space-x-2 mt-5 w-full text-sm">
            <hr className="w-6/12 h-2 border-gray-500 mt-2" />
            <p>Or</p>
            <hr className="w-6/12 h-2 border-gray-500 mt-2" />
          </div>

          <h1 className="mt-4 font-semibold">Signup with your email address</h1>

          {/* email form */}

          <form
            className="flex flex-col items-start gap-4 justify-center h-full mt-4 w-full text-sm"
            onSubmit={handleSubmit}

          >
            <div className="flex flex-col w-full space-y-1">
              <label className="text-gray-800">Username</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="rounded-xl border border-gray-300 w-full h-9"
              />
            </div>
            <div className="flex flex-col w-full space-y-1">
              <label className="text-gray-800">Email</label>
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
                <label className="text-gray-800">Password</label>
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
              <p className="text-xs text-gray-700">
                Use 8 or more characters with a mix of letters, numbers &
                symbols
              </p>
            </div>

            {/* gender specification */}

            <div className="flex flex-col gap-3 mt-5">
              <p className="font-semibold ">What's your gender ?</p>
              <span className="flex justify-between items-center gap-6 pl-2">
                <label className="flex justify-center items-center gap-2">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={gender === "male"}
                    onChange={() => setGender("male")}
                  />
                  Male
                </label>

                <label className="flex justify-center items-center gap-2">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={gender === "female"}
                    onChange={() => setGender("female")}
                  />
                  Female
                </label>
              </span>
            </div>

            birth date
            <div className="flex flex-col gap-3 mt-6">
              <p className="font-semibold ">What's your date of birth ?</p>
              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              />
            </div>

            <div className="flex  items-center gap-3 text-xs mt-2">
              <input
                className="border-2"
                type="checkbox"
                checked={agree}
                onChange={() => setAgree(!agree)}
              />
              <label>
                Share my registration data with our content providers for
                marketing purposes.
              </label>
            </div>
            <span className="text-xs">
              By creating an account, you agree to the
              <Link to="/termsofuseandprivacy" className="text-blue-500 px-1">
                Terms of use and Privacy Policy.
              </Link>
            </span>
            <button
              className="bg-blue-500 px-12 py-3 rounded-xl w-full mt-5 justify-center text-white"
              type="submit"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
