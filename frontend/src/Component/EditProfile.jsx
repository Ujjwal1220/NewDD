import React, { useState } from "react";
import UserCard from "./UserCard";
import { useDispatch } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utilish/extrastuff";
import { addUser } from "../utilish/userSlice";

const EditProfile = ({ user }) => {
  const [FirstName, setFirstName] = useState(user.FirstName);
  const [LastName, setLastName] = useState(user.LastName);
  const [gender, setgender] = useState(user.gender);
  const [photourl, setphotourl] = useState(user.photourl);
  const [error, seterror] = useState("");
  const [toast, settoast] = useState(false);

  const dispatch = useDispatch();

  const saveProfile = async () => {
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          FirstName,
          LastName,
          photourl,
          gender,
        },
        { withCredentials: true }
      );

      dispatch(addUser(res?.data?.data));
      settoast(true);
      setTimeout(() => {
        settoast(false);
      }, 3000);
    } catch (err) {
      seterror(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="flex justify-center items-center h-screen scroll">
        <div className="card bg-base-300 w-96 shadow-2xl">
          <div className="card-body">
            <h2 className="card-title">Edit Profile</h2>
            {/* First Name */}
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <h1>First Name</h1>
              </div>
              <input
                type="text"
                placeholder="Type here"
                value={FirstName}
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </label>
            {/* Last Name */}
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <h1>Last Name</h1>
              </div>
              <input
                type="text"
                placeholder="Type here"
                value={LastName}
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setLastName(e.target.value)}
              />
            </label>
            {/* Gender */}
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <h1>Gender</h1>
              </div>
              <input
                type="text"
                placeholder="Type here"
                value={gender}
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setgender(e.target.value)}
              />
            </label>
            {/* Photo URL */}
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <h1>Photo URL</h1>
              </div>
              <input
                type="text"
                placeholder="Type here"
                value={photourl}
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setphotourl(e.target.value)}
              />
            </label>
            <div className="card-actions justify-center">
              <button className="btn btn-primary" onClick={saveProfile}>
                Save Profile
              </button>
            </div>
            {error && (
              <div className="alert alert-error mt-4">
                <span>{error}</span>
              </div>
            )}
          </div>
        </div>
      </div>
      <UserCard user={{ FirstName, LastName, gender, photourl }} />
      {toast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile updated successfully.</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
