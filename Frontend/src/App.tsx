import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Home from "./components/Home";
import SignUp from "./auth/SignUp";
import SignIn from "./auth/SignIn";
import { useEffect, useState } from "react";
import { AuthContext } from "./hooks/AuthProvider";
import Navbar from "./components/Navbar";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/sign-in" element={isAuthenticated ? <Navigate to="/" /> : <SignIn />} />
          <Route path="/sign-up" element={isAuthenticated ? <Navigate to="/" /> : <SignUp />} />
          <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/sign-in" />} />
          <Route path="/*" element={isAuthenticated ? <Home /> : <Navigate to="/sign-in" />} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
