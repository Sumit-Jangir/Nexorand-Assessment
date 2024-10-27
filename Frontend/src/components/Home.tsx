import { useEffect, useState } from "react";
import { User } from "lucide-react";
import DialogComponent from "./DialogComponent";
import { useGetUsers } from "@/hooks/backend-calls/useGetUsers";
import { useGetUserHistory } from "@/hooks/backend-calls/useGetUserHistory";
import { useGetTimeFrameHistory } from "@/hooks/backend-calls/useGetTimeFrameHistory";
import { useClaimPoints } from "@/hooks/backend-calls/useClaimPoints";
import { history, TimeFrame, UserTypes } from "@/lib/types";

const Home = () => {
  const [activeTab, setActiveTab] = useState<TimeFrame>("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { leaderboard, setLeaderboard } = useGetUsers();
  const { userHistory, getUserHistory } = useGetUserHistory();
  const { usersHistory, getHistory } = useGetTimeFrameHistory();
  const claimPoints = useClaimPoints(setLeaderboard);

  const handleClickOnUser = (user: UserTypes) => () => {
    claimPoints(user);
    getUserHistory(user);
    setIsDialogOpen(true);
  };

  useEffect(() => {
    if (activeTab !== "all") {
      getHistory(activeTab);
    }
  }, [activeTab, getHistory]);
  return (
    <div className=" pb-4 max-w-md md:max-w-3xl mx-auto  my-10 bg-white shadow-md rounded-lg">
      <div className="flex justify-between items-center py-2 px-4 bg-blue-500 text-white rounded-t-lg">
        <p className="text-lg font-bold capitalize">
          total: ₹{leaderboard.reduce((total, user) => total + user.Points, 0)}
        </p>
        <p className="text-sm font-medium">LeaderBoard</p>
      </div>

      <div className="flex justify-center space-x-4 mt-4">
        {history.map((tab: TimeFrame) => (
          <button
            key={tab}
            className={`px-4 py-1.5 rounded-full font-medium capitalize ${
              activeTab === tab ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      {activeTab === "all" && (
        <div className="flex justify-evenly items-center  p-6 font-medium">
          {leaderboard.slice(0, 3).map((entry, index) => (
            <div key={index} className="text-center">
              <p>{entry.username}</p>
              <p>{entry.Points}</p>
              <p className="text-red-500">Prize: ₹{entry.Points}</p>
            </div>
          ))}
        </div>
      )}
      {activeTab === "all" && (
        <div>
          {leaderboard.map((entry, i) => (
            <div
              key={i}
              className="flex justify-between items-center py-2 px-4 border-b first-of-type:border-t hover:bg-gray-100 cursor-pointer"
              onClick={handleClickOnUser(entry)}
            >
              <div className="flex items-center gap-2  ">
                <User className="h-6 w-6" />
                <div>
                  <p className="text-lg font-medium">{entry.username}</p>
                  <p className="text-sm">Rank: {i + 1}</p>
                </div>
              </div>
              <div className="flex items-center">
                <p className="text-lg text-red-500">prize: ₹{entry.Points}</p>
              </div>
              <div className="text-green-600 font-medium">{entry.Points}</div>
            </div>
          ))}
        </div>
      )}
      {activeTab !== "all" && usersHistory && (
        <div className="mt-10">
          {usersHistory.map((user, i) => (
            <div
              key={i}
              className="flex justify-around items-center py-2 border-b first-of-type:border-t hover:bg-gray-100 cursor-pointer"
            >
              <div className="flex items-center gap-2  ">
                <User className="h-6 w-6" />
                <div>
                  <p className="text-lg font-medium">{user._id}</p>
                  <p className="text-sm text-red-500">Rank: {i + 1}</p>
                </div>
              </div>
              <p className="capitalize font-medium">
                total Points Awarded: <span className="text-base text-green-600">₹{user.totalPointsAwarded}</span>
              </p>
            </div>
          ))}
        </div>
      )}
      <DialogComponent isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} userhistory={userHistory} />
    </div>
  );
};

export default Home;
