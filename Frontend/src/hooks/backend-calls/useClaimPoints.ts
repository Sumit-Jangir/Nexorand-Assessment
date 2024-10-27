import { useCallback } from "react";
import axios from "axios";
import { toast } from "sonner";
import { UserTypes } from "@/lib/types";

export const useClaimPoints = (setLeaderboard: React.Dispatch<React.SetStateAction<UserTypes[]>>) => {
  const claimPoints = useCallback(
    async (user: UserTypes) => {
      try {
        const response = await axios.patch(`${import.meta.env.VITE_API_KEY}/user/v1/claim-points`, {
          username: user.username,
        });
        if (response.status === 200) {
          const claimedUser: UserTypes = response.data.data;
          setLeaderboard((prev) =>
            prev.map((e) => (e.username === user.username ? claimedUser : e)).sort((a, b) => b.Points - a.Points)
          );
          toast.success(response.data.message);
        }
      } catch (error) {
        console.error("Error claiming points:", error);
      }
    },
    [setLeaderboard]
  );

  return claimPoints;
};
