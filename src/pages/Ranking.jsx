import { useEffect, useState } from "react";
import fetchRanking from "../services/fetchRanking";
import timeAgo from "../utils/timeAgo";
import { useNavigate } from "react-router-dom";
import { Trophy, Clock, Calendar } from "lucide-react";

const Ranking = () => {
  const navigate = useNavigate();
  const [ranking, setRanking] = useState([]);

  const startRank = async () => {
    try {
      const data = await fetchRanking();
      setRanking(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const getMedalColor = (position) => {
    switch (position) {
      case 1:
        return "text-yellow-500";
      case 2:
        return "text-gray-400";
      case 3:
        return "text-amber-600";
      default:
        return "text-gray-600";
    }
  };

  useEffect(() => {
    startRank();
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-800 rounded-lg shadow-lg text-gray-100 my-2">
      <button
        className=" cursor-pointer border border-gray-50 rounded-md px-2 py-1 absolute"
        onClick={() => navigate("/")}
      >
        Home
      </button>
      <h1 className="text-4xl font-bold mb-6 flex items-center justify-center gap-2">
        <Trophy className="text-yellow-500" />
        Ranking:
      </h1>

      <div className="grid grid-cols-4 gap-4 px-4 mb-2 text-sm font-semibold text-gray-600">
        <div>Rank</div>
        <div>Name</div>
        <div className="text-right">Time</div>
        <div className="text-right">Created</div>
      </div>

      <div className="space-y-2">
        {ranking &&
          ranking.map((rank, index) => (
            <div
              key={rank.id}
              className="grid grid-cols-4 gap-4 items-center p-4 mb-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
            >
              <div className="flex items-center">
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full ${getMedalColor(
                    index + 1
                  )} font-bold`}
                >
                  {index + 1}
                </div>
              </div>
              <div className="min-w-0">
                <h3 className="font-semibold truncate">{rank.name}</h3>
              </div>

              <div className="flex items-center justify-end gap-2 ">
                <Clock className="w-4 h-4 flex-shrink-0" />
                <span>{rank.time}</span>
              </div>

              <div className="flex items-center justify-end gap-2">
                <Calendar className="w-4 h-4 flex-shrink-0" />
                <span>{timeAgo(rank.createdAt)}</span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
export default Ranking;
