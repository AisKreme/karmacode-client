import React, { useContext } from "react";
import { OrganisationContext } from "../../context/organisation.context";
import { FetchingUserContext } from "../../context/fetchingUser.context";
import { UserContext } from "../../context/app.context";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../config";
import { Button, Container, Box, Typography, TextField } from "@mui/material";

const OrgaCreate = () => {
  const { organisation, setOrganisation } = useContext(OrganisationContext);
  const { user, setUser } = useContext(UserContext);
  const { fetchingUser, setFetching } = useContext(FetchingUserContext);
  const navigate = useNavigate();

  const handleCreateOrga = async (event) => {
    event.preventDefault();
    try {
      let newOrga = {
        name: event.target.name.value,
        houseNr: event.target.houseNr.value,
        street: event.target.street.value,
        city: event.target.city.value,
        zip: event.target.zip.value,
        country: event.target.country.value,
        description: event.target.description.value,
      };

      let { data } = await axios.post(
        `${API_URL}/create-organisation`,
        newOrga,
        {
          withCredentials: true,
        }
      );
      setFetching(false);
      setUser(data);
      navigate(`/organisation/${data.organisation}`);
    } catch (err) {
      console.log(err.response.data);
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
            Create an Organisation
          </Typography>
          <Box
            component="form"
            onSubmit={handleCreateOrga}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              // error
              // helperText
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name of your organisation"
              autoComplete="off"
              color="secondary"
              name="name"
              autoFocus
            />
            <TextField
              // error
              // helperText
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
              // error
              // helperText
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
              // error
              // helperText
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
              // error
              // helperText
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
              // error
              // helperText
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
              // error
              // helperText
              margin="normal"
              fullWidth
              autoComplete="off"
              color="secondary"
              id="description"
              name="description"
              label="What is your organisation about?"
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

export default OrgaCreate;
