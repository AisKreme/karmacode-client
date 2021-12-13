import React from "react";
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { API_URL } from "./config";
import axios from "axios";
import Navbar from "./components/Navbar/Navbar";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import Map from "./components/Map/Map";
import { UserContext } from "./context/app.context";

function App() {
  const { user, setUser } = useContext(UserContext);
  const [myError, setError] = useState(null);

  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      let userResponse = await axios.get(`${API_URL}/user`, {
        withCredentials: true,
      });
      setUser(userResponse.data);
    })();
  }, []);

  const handleSignIn = async (event) => {
    event.preventDefault();
    try {
      let newUser = {
        userInput: event.target.userInput.value,
        password: event.target.password.value,
      };
      let res = await axios.post(`${API_URL}/login`, newUser, {
        withCredentials: true,
      });
      setUser(res.data);
      navigate("/");
    } catch (err) {
      setError(err.response.data);
    }
  };

  const handleLogout = async () => {
    await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
    setUser(null);
  };

  return (
    <div>
      <Navbar onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Map />} />
        <Route path="/map" element={<Map />} />
        <Route
          path="/login"
          element={<Login myError={myError} onLogin={handleSignIn} />}
        />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
