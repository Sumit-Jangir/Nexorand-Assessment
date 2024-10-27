import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { PopoverComponent } from "./PopoverComponent";
import { useContext } from "react";
import { AuthContext } from "@/hooks/AuthProvider";

const Navbar = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <div className="w-full flex bg-gray-700 text-white">
      <div className="flex justify-start items-center text-xl py-2 px-10">
        <Link to="/">HOME</Link>
      </div>
      <div className="flex justify-end items-center gap-5 text-xl py-2 px-2 sm:px-10 ml-auto">
        {isAuthenticated ? (
          <>
            <Button onClick={handleLogout}>Logout</Button>
            <PopoverComponent />
          </>
        ) : (
          <>
            <Link to="/sign-in">
              <Button>Login</Button> {/* Login button */}
            </Link>
            <Link to="/sign-up">
              <Button>Sign-Up</Button> {/* Sign-Up button */}
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
