import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utilish/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utilish/extrastuff";
const Login = () => {
  const [Email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, seterror] = useState("");
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [isLogin, setisLogin] = useState("true");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        BASE_URL + "/login",
        {
          Email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(addUser(response.data));
      navigate("/");
    } catch (err) {
      seterror(err?.response?.data);
    }
  };

  const handleSignup = async () => {
    try {
      const response = await axios.post(
        BASE_URL + "/signup",
        {
          FirstName,
          LastName,
          Email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(addUser(response.data.data));
      navigate("/profile");
    } catch (err) {
      seterror(err?.response?.data);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">{isLogin ? "Login" : "Sign Up"}</h2>
          <div>
            {!isLogin && (
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <h1>FirstName</h1>
                </div>
                <input
                  type="text"
                  placeholder="Type here"
                  value={FirstName}
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </label>
            )}
          </div>
          <div>
            {!isLogin && (
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <h1>LastName</h1>
                </div>
                <input
                  type="text"
                  placeholder="Type here"
                  value={LastName}
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </label>
            )}
          </div>
          <div>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <h1>Email</h1>
              </div>
              <input
                type="text"
                placeholder="Type here"
                value={Email}
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <h1>Password</h1>
              </div>
              <input
                type="text" // Changed type to "password"
                placeholder="Type here"
                value={password}
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>
          <p className="text-red-600 ">{error}</p>
          <div className="card-actions justify-center">
            <button
              className="btn btn-primary"
              onClick={isLogin ? handleLogin : handleSignup}
            >
              {isLogin ? "Login" : "Sign Up"}
            </button>
          </div>
          <p
            className="text-red-600 m-auto cursor-pointer "
            onClick={() => setisLogin((value) => !value)}
          >
            {isLogin ? "New User : Sign Up here" : "Existing User : Login here"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
