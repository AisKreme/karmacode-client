import React, { useState, useEffect, useContext } from "react";
import { OrganisationContext } from "../../context/organisation.context";
import { Link, useNavigate, useParams } from "react-router-dom";
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
  Card,
  CardContent,
  CardActionArea,
  CardMedia,
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
      <Container style={{ padding: "0", margin: "3rem auto" }}>
        <Typography component="h3" variant="h4">
          Description:
        </Typography>
        <Typography component="p" variant="p">
          {organisation.description}
        </Typography>
      </Container>
      <Typography component="h3" variant="h4">
        Projects:
      </Typography>
      <Container
        style={{
          padding: "0",
          margin: "3rem auto",
          display: "grid",
          gridTemplateColumns: "[first] auto [line2] auto [line3] auto [end]",
          gridGap: "100px",
        }}
      >
        {organisation.projects.map((elem) => (
          <Link to={`/project/${elem._id}`} style={{ textDecoration: "none" }}>
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image="https://i.picsum.photos/id/866/536/354.jpg?hmac=tGofDTV7tl2rprappPzKFiZ9vDh5MKj39oa2D--gqhA"
                  alt="Project Picture"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {elem.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {elem.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Link>
        ))}
      </Container>
    </Container>
  );
};

export default OrgaProfil;
