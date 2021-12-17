import React, { useState, useContext } from "react";
import { OrganisationContext } from "../../context/organisation.context";
import { FetchingUserContext } from "../../context/fetchingUser.context";
import { UserContext } from "../../context/app.context";
import { ProjectContext } from "../../context/project.context";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../config";
import { Button, Container, Box, Typography, TextField } from "@mui/material";

const ProjectCreate = () => {
  const { project, setProject } = useContext(ProjectContext);
  const { organisation, setOrganisation } = useContext(OrganisationContext);
  const { user, setUser } = useContext(UserContext);
  const { fetchingUser, setFetching } = useContext(FetchingUserContext);
  const [myError, setError] = useState({
    name: "",
    address: "",
    something: "",
  });
  const navigate = useNavigate();

  const handleCreateProject = async (event) => {
    event.preventDefault();
    try {
      let newProject = {
        name: event.target.name.value,
        houseNr: event.target.houseNr.value,
        street: event.target.street.value,
        city: event.target.city.value,
        zip: event.target.zip.value,
        country: event.target.country.value,
        description: event.target.description.value,
      };

      let { data } = await axios.post(`${API_URL}/create-project`, newProject, {
        withCredentials: true,
      });
      setFetching(false);
      setOrganisation(data);
      navigate(`/organisation/${data._id}`);
    } catch (err) {
      if (err.response === "Please enter a name for your project.") {
        setError({ name: err.response });
      } else if (
        err.response === "Please make sure to enter a valid address."
      ) {
        setError({ address: err.response });
      } else if (err.response === "Something went wrong! PLEASE MOVE BACK!") {
        setError({ something: err.response });
      }
    }
  };
  if (fetchingUser) {
    return <p>LOADING ...</p>;
  }
  return (
    <>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5" align="center">
            Create a new Project
          </Typography>
          <Box
            component="form"
            onSubmit={handleCreateProject}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              error={Boolean(myError?.name)}
              helperText={myError?.name}
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name of your project"
              autoComplete="off"
              color="secondary"
              name="name"
              autoFocus
            />
            <TextField
              error={Boolean(myError?.address)}
              helperText={myError?.address}
              margin="normal"
              required
              style={{ width: "30%" }}
              id="houseNr"
              label="House Nr."
              autoComplete="off"
              color="secondary"
              name="houseNr"
            />
            <TextField
              error={Boolean(myError?.address)}
              helperText={myError?.address}
              margin="normal"
              required
              style={{ width: "70%" }}
              id="street"
              label="Street"
              autoComplete="off"
              color="secondary"
              name="street"
            />
            <TextField
              error={Boolean(myError?.address)}
              helperText={myError?.address}
              margin="normal"
              required
              style={{ width: "60%" }}
              id="city"
              label="City"
              autoComplete="off"
              color="secondary"
              name="city"
            />
            <TextField
              error={Boolean(myError?.address)}
              helperText={myError?.address}
              margin="normal"
              required
              style={{ width: "40%" }}
              id="zip"
              label="Postal Code"
              autoComplete="off"
              color="secondary"
              name="zip"
            />
            <TextField
              error={Boolean(myError?.address)}
              helperText={myError?.address}
              margin="normal"
              required
              fullWidth
              id="country"
              label="Country"
              autoComplete="off"
              color="secondary"
              name="country"
            />
            <TextField
              error={Boolean(myError.something?.something)}
              helperText={myError.something?.something}
              margin="normal"
              fullWidth
              autoComplete="off"
              color="secondary"
              id="description"
              name="description"
              label="What is your project about?"
              multiline
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, mr: "35%", ml: "35%", width: "30%" }}
            >
              Create
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default ProjectCreate;
