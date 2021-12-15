import React, { useState, useEffect, useContext } from "react";
import { OrganisationContext } from "../../context/organisation.context";
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
  const { user, setUser } = useContext(UserContext);
  const [creator, setCreator] = useState({
    name: "",
  });
  const { organisation, setOrganisation } = useContext(OrganisationContext);
  const { fetchingUser, setFetching } = useContext(FetchingUserContext);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      try {
        let responseOrga = await axios.get(`${API_URL}/organisation/${id}`);
        setFetching(false);
        setOrganisation(responseOrga.data);

        if (!responseOrga.data.contact.name) {
          let responseUser = await axios.get(
            `${API_URL}/user/${responseOrga.data.contact.user}`
          );
          setCreator({ name: responseUser.data.username });
        } else {
          setCreator({ name: responseOrga.data.contact.name });
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  if (fetchingUser || !organisation || !creator) {
    return <p>LOADING ...</p>;
  }
  return (
    <Container>
      <Container style={{}}>
        <Typography variant="h3" component="h2" align="center">
          {organisation.name}
        </Typography>
        <Typography variant="subtext" component="h3" align="center">
          @{creator.name}
        </Typography>
        <Typography variant="subtext" component="p" align="center">
          {organisation.street}, {organisation.city}, {organisation.country}
        </Typography>
      </Container>
    </Container>
  );
};

export default OrgaProfil;
