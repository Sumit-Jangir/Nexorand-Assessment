import axios from "axios";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useContext, useState } from "react";
import { toast } from "sonner";
import { AuthContext } from "@/hooks/AuthProvider";
import { UserTypes } from "@/lib/types";

export const PopoverComponent = () => {
  const [user, setUser] = useState<UserTypes | null>(null);
  const { setIsAuthenticated } = useContext(AuthContext);

  const getuserdata = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_KEY}/user/v1/get-users-info`,
        {},
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status == 200) {
        console.log(response.data.data);
        setUser(response.data.data);
      } else {
        localStorage.removeItem("token");
        toast.error("Please login again");
        setIsAuthenticated(false);
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      localStorage.removeItem("token");
      toast.error("Please login again");
      setIsAuthenticated(false);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div
          className="h-10 w-10 rounded-full bg-black text-white flex justify-center items-center cursor-pointer"
          onClick={getuserdata}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-user"
          >
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-72 p-3 my-3 bg-blue-50" align="end">
        <div>
          Name: {user?.firstName} {user?.lastName}
        </div>
        <div>Email: {user?.email}</div>
        <div>Username: {user?.username}</div>
        <div>points: {user?.Points}</div>
      </PopoverContent>
    </Popover>
  );
};
