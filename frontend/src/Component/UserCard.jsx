import React from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utilish/extrastuff";
import { removeFeed } from "../utilish/feedSlice";

const UserCard = ({ user }) => {
  // Accessing properties directly from the user object
  const { FirstName, LastName, photourl, gender, _id } = user;
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/sendconnectionrequest/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeFeed(userId));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="card card-compact bg-base-300 w-64 shadow-xl flex items-center m-4">
      <figure className="my-4">
        <img src={photourl} alt="User Photo" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{FirstName + " " + LastName}</h2>
        <p>{gender}</p>
        <div className="card-actions">
          <button
            className="btn btn-primary"
            onClick={() => handleSendRequest("ignored", _id)}
          >
            Ignore
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => handleSendRequest("interested", _id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
