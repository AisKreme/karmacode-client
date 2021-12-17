import React, { useState, useEffect, useContext } from "react";
import { OrganisationContext } from "../../context/organisation.context";
import { ProjectContext } from "../../context/project.context";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../context/app.context";
import { FetchingUserContext } from "../../context/fetchingUser.context";
import axios from "axios";
import { API_URL } from "../../config";
import {
  AppBar,
  Box,
  Toolbar,
  Button,
  Container,
  Typography,
} from "@mui/material";

const OrgaProfil = () => {
  const [creator, setCreator] = useState({
    name: "",
  });
  const { project, setProject } = useContext(ProjectContext);
  const { organisation, setOrganisation } = useContext(OrganisationContext);
  const { fetchingUser, setFetching } = useContext(FetchingUserContext);
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      try {
        let responseProject = await axios.get(`${API_URL}/project/${id}`);
        setFetching(false);
        setProject(responseProject.data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  if (fetchingUser || !project) {
    return <p>LOADING ...</p>;
  }
  return (
    <Container>
      <Container style={{}}>
        <Typography variant="h3" component="h2" align="center">
          {project.name}
        </Typography>
        <Typography variant="subtext" component="p" align="center">
          {project.street}, {project.city}, {project.country}
        </Typography>
      </Container>
    </Container>
  );
};

export default OrgaProfil;
