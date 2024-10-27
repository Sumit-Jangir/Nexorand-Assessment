import { useState, useCallback } from "react";
import axios from "axios";
import { HistoryType, UserTypes } from "@/lib/types";

export const useGetUserHistory = () => {
  const [userHistory, setUserHistory] = useState<HistoryType[]>([]);

  const getUserHistory = useCallback(async (user: UserTypes) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_KEY}/user/v1/your-history`, {
        username: user.username,
      });
      if (response.status === 200) {
        setUserHistory(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching user history:", error);
    }
  }, []);

  return { userHistory, getUserHistory };
};
