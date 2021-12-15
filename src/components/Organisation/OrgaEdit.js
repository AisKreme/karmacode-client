import React, { useState, useContext, useEffect } from "react";
import { OrganisationContext } from "../../context/organisation.context";
import { FetchingUserContext } from "../../context/fetchingUser.context";
import { UserContext } from "../../context/app.context";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../config";
import {
  Button,
  Container,
  Box,
  Typography,
  TextField,
  ButtonGroup,
} from "@mui/material";

const OrgaEdit = () => {
  const { organisation, setOrganisation } = useContext(OrganisationContext);
  const { user, setUser } = useContext(UserContext);
  const { fetchingUser, setFetching } = useContext(FetchingUserContext);
  const [myError, setError] = useState({
    name: "",
    address: "",
    something: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        let { data } = await axios.get(
          `${API_URL}/organisation/${user.organisation}`
        );
        setFetching(false);
        setOrganisation(data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [setOrganisation]);

  const handleEditOrga = async (event) => {
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

      let { data } = await axios.patch(
        `${API_URL}/edit-organisation`,
        newOrga,
        {
          withCredentials: true,
        }
      );
      setOrganisation(data);
      navigate(`/organisation/${data._id}`);
    } catch (err) {
      if (err.response.data === "Please enter a name for your organisation.") {
        setError({ name: err.response.data });
      } else if (
        err.response.data === "Please make sure to enter a valid address."
      ) {
        setError({ address: err.response.data });
      } else if (
        err.response.data === "Something went wrong! PLEASE MOVE BACK!"
      ) {
        setError({ something: err.response.data });
      }
    }
  };

  const handleDelete = async (event) => {
    try {
      await axios.delete(`${API_URL}/organisation/delete`, {
        withCredentials: true,
      });
      let userData = await axios.get(`${API_URL}/user`, {
        withCredentials: true,
      });
      setUser(userData.data);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  if (fetchingUser || !organisation) {
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
            Edit your Organisation
          </Typography>
          <Box
            component="form"
            onSubmit={handleEditOrga}
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
              label="Name of your organisation"
              autoComplete="off"
              color="secondary"
              name="name"
              defaultValue={`${organisation.name}`}
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
              defaultValue={`${organisation.houseNr}`}
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
              defaultValue={`${organisation.street}`}
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
              defaultValue={`${organisation.city}`}
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
              defaultValue={`${organisation.zip}`}
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
              defaultValue={`${organisation.country}`}
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
              label="What is your organisation about?"
              multiline
              defaultValue={`${organisation.description}`}
            />
            <ButtonGroup
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button
                type="submit"
                fullWidth
                color="secondary"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Edit
              </Button>
              <Button
                onClick={handleDelete}
                fullWidth
                color="error"
                sx={{ mt: 3, mb: 2 }}
              >
                Delete
              </Button>
            </ButtonGroup>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default OrgaEdit;
