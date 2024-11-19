import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utilish/extrastuff";
import axios from "axios";
import { addFeed } from "../utilish/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    try {
      // Fetch feed if not already available
      if (!feed || feed.length === 0) {
        const res = await axios.get(BASE_URL + "/feed", {
          withCredentials: true,
        });
        console.log(res?.data?.data); // Check where data is located
        dispatch(addFeed(res?.data?.data)); // Update feed in Redux store
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getFeed();
  }, []); // Fetch feed on component mount

  // Render UserCards if feed is available
  return feed && feed.length > 0 ? (
    <div>
      {feed.map((user) => (
        <UserCard key={user._id} user={user} />
      ))}
    </div>
  ) : (
    <div>No users available in the feed</div>
  );
};

export default Feed;
