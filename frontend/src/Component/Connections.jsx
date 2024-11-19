import React, { useEffect } from "react";
import { BASE_URL } from "../utilish/extrastuff";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utilish/connectionSlice";

const Connections = () => {
  const feed = useSelector((store) => store.connections);

  const dispatch = useDispatch();
  const fetchconnection = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      console.log(res?.data?.data);
      dispatch(addConnections(res?.data?.data)); // Dispatch connections to Redux
    } catch (err) {
      console.error("Failed to fetch connections", err);
    }
  };
  useEffect(() => {
    fetchconnection();
  }, []);

  if (!feed || feed.length === 0) return <h1>No connection found</h1>;
  return (
    <div className="text-center my-4 w-1/2 mx-auto">
      <h1 className="text-4xl font-bold ">Connections</h1>
      {feed.map((connection) => {
        const { _id, FirstName, LastName, photourl, gender } = connection;
        return (
          <div key={_id} className=" flex m-4 p-4 rounded-lg bg-base-300">
            <div>
              <img
                alt="photo"
                className="w-20 h-20 rounded-full"
                src={photourl}
              />
            </div>
            <div className="text-left mx-4">
              <h2 className="font-bold text-xl">
                {FirstName + " " + LastName}
              </h2>
              <p>{gender}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
