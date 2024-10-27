import { useState, useCallback } from "react";
import axios from "axios";
import { TimeFrame, UsersHistoryTypes } from "@/lib/types";

export const useGetTimeFrameHistory = () => {
  const [usersHistory, setUsersHistory] = useState<UsersHistoryTypes[]>([]);

  const getHistory = useCallback(async (timeFrame: TimeFrame) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_KEY}/user/v1/your-${timeFrame}-history`);
      if (response.status === 200) {
        let historyData = response.data.data;

        if (timeFrame === "daily") {
          historyData = historyData.sort(
            (a: UsersHistoryTypes, b: UsersHistoryTypes) => b.totalPointsAwarded - a.totalPointsAwarded
          );
        } else if (timeFrame === "weekly") {
          historyData = historyData.map((user: { _id: string; totalPoints: number }) => ({
            _id: user._id,
            totalPointsAwarded: user.totalPoints,
          }));
        }
        setUsersHistory(historyData);
      }
    } catch (error) {
      console.error(`Error fetching ${timeFrame} history:`, error);
    }
  }, []);

  return { usersHistory, getHistory };
};
