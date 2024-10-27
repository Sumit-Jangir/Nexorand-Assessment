export type UsersHistoryTypes = { _id: string; totalPointsAwarded: number };
export type TimeFrame = "all" | "daily" | "weekly" | "monthly";
export const history: TimeFrame[] = ["all", "daily", "weekly", "monthly"];
export type UserTypes = {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  Points: number;
};
export type HistoryType = {
  pointsAwarded: number;
  date: string;
};
