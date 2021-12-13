import React from "react";
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { API_URL } from "./serverConfig";
import axios from "axios";
import Navbar from "./components/Navbar/Navbar";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import { Container } from "@mui/material";

function App() {
  const [myError, setError] = useState(null);

  // const handleSignIn = async (event) => {
  //   event.preventDefault();
  //   try {
  //     let newUser = {
  //       userInput: event.target.userInput.value,
  //       password: event.target.password.value,
  //     };
  //     let res = await axios.post(`${API_URL}/signin`, newUser, {
  //       withCredentials: true,
  //     });
  //     setUser(res.data);
  //   } catch (err) {
  //     //console.log(err.response);
  //     setError(err.response.data.error);
  //   }
  // };

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element />
        <Route
          path="/login"
          element={<Login myError={myError} onSignIn={undefined} />}
        />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
