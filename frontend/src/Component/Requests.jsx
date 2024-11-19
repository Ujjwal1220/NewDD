import axios from "axios";
import { BASE_URL } from "../utilish/extrastuff";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../utilish/requestSlice";
import { useEffect } from "react";

const Requests = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.request);

  const reviewRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (err) {
      console.error(err);
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/request/received", {
        withCredentials: true,
      });
      // console.log(res?.data?.data[0]?.fromUserId);
      dispatch(addRequest(res?.data?.data));
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchRequests();
  }, []);

  if (!feed || feed.length === 0)
    return <h1 className="text-center text-4xl font-bold">No Request found</h1>;
  return (
    <div className="text-center my-4 w-1/3 mx-auto">
      <h1 className="text-4xl font-bold ">Requests</h1>
      {feed.map((request) => {
        const { _id, FirstName, LastName, photourl, gender } =
          request.fromUserId;
        return (
          <div
            key={_id}
            className=" flex m-4 p-4 rounded-lg bg-base-300 items-center"
          >
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
            <button
              className="btn btn-neutral "
              onClick={() => reviewRequest("accepted", request._id)}
            >
              Accept
            </button>
            <button
              className="btn btn-primary mx-5 "
              onClick={() => reviewRequest("rejected", request._id)}
            >
              Reject
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
