import { useState } from "react";
import { Link } from "react-router-dom";

export const HomePage = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("false");

  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="bg-gray-800 text-gray-100 rounded-md px-4 py-2 flex items-center justify-center flex-col">
        <div className="w-lg ">
          <img
            src="/big_disneyland.jpeg"
            alt="Game preview"
            className="rounded-md py-2 px-4"
          />
        </div>
        <Link
          to={"/disney"}
          className="px-4 py-2 rounded-md border text-gray-100 cursor-pointer"
        >
          PLAY
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
