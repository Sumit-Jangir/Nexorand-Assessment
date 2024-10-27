import { useState, useEffect } from "react";
import axios from "axios";
import { UserTypes } from "@/lib/types";

export const useGetUsers = () => {
  const [leaderboard, setLeaderboard] = useState<UserTypes[]>([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_KEY}/user/v1/get-users`);
        if (response.status === 200) {
          setLeaderboard(response.data.data.sort((a: UserTypes, b: UserTypes) => b.Points - a.Points));
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    getUsers();
  }, []);

  return { leaderboard, setLeaderboard };
};
