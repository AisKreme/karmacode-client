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
import { FetchingUserContext } from "./context/fetchingUser.context";
import { OrganisationContext } from "./context/organisation.context";
import { MyOrgaContext } from "./context/myOrga.context";
import OrgaCreate from "./components/Organisation/OrgaCreate";
import LandingPage from "./components/landingPage/LandingPage";
import OrgaEdit from "./components/Organisation/OrgaEdit";
import OrgaProfil from "./components/Organisation/OrgaProfil";
import OrgaManage from "./components/Organisation/OrgaManage";
import ProjectProfil from "./components/Project/ProjectProfil";
import ProjectCreate from "./components/Project/ProjectCreate";

function App() {
  const { user, setUser } = useContext(UserContext);
  const [myError, setError] = useState(null);
  const { fetchingUser, setFetching } = useContext(FetchingUserContext);
  const { organisation, setOrganisation } = useContext(OrganisationContext);
  const { myOrga, setMyOrga } = useContext(MyOrgaContext);

  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      try {
        let userRes = await axios.get(`${API_URL}/user`, {
          withCredentials: true,
        });
        let orgaRes = await axios.get(
          `${API_URL}/organisation/${user.Res.organisation}`
        );
        setFetching(false);
        setUser(userRes.data);
        setMyOrga(orgaRes.data);
      } catch (err) {
        setFetching(false);
      }
    })();
  }, [setUser]);

  const handleSignIn = async (event) => {
    event.preventDefault();
    try {
      let newUser = {
        userInput: event.target.userInput.value,
        password: event.target.password.value,
      };
      let { data } = await axios.post(`${API_URL}/login`, newUser, {
        withCredentials: true,
      });
      setUser(data);
      navigate("/");
    } catch (err) {
      setError(err.response.data);
    }
  };

  const handleLogout = async (event) => {
    event.preventDefault();
    try {
      let { data } = await axios.post(
        `${API_URL}/logout`,
        {},
        { withCredentials: true }
      );
      setUser(data);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  if (fetchingUser) {
    return <p>LOADING ...</p>;
  }
  return (
    <div>
      <Navbar onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/map" element={<Map />} />
        <Route
          path="/login"
          element={<Login myError={myError} onLogin={handleSignIn} />}
        />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/create-organisation" element={<OrgaCreate />} />
        <Route path="/edit-organisation" element={<OrgaEdit />} />
        <Route path="/manage-organisation" element={<OrgaManage />} />
        <Route path="/organisation/:id" element={<OrgaProfil />} />
        <Route path="/create-project" element={<ProjectCreate />} />
        <Route path="/project/:id" element={<ProjectProfil />} />
      </Routes>
    </div>
  );
}

export default App;
