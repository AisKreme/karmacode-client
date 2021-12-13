import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { API_URL } from "../../config";

const SignUp = (props) => {
  const [myError, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignUp = async (event) => {
    event.preventDefault();
    let newUser = {
      username: event.target.username.value,
      email: event.target.email.value,
      password: event.target.password.value,
      confirmPassword: event.target.confirmPassword.value,
    };
    try {
      await axios.post(`${API_URL}/signup`, newUser, {
        withCredentials: true,
      });
      navigate("/");
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <Box component="form" onSubmit={handleSignUp} noValidate sx={{ mt: 1 }}>
          <TextField
            error={Boolean(myError?.username)}
            helperText={myError?.username}
            margin="normal"
            color="secondary"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="off"
            autoFocus
          />
          <TextField
            margin="normal"
            color="secondary"
            error={Boolean(myError?.email)}
            helperText={myError?.email}
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="off"
          />
          <TextField
            error={Boolean(myError?.password)}
            helperText={myError?.password}
            margin="normal"
            color="secondary"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
          />
          <TextField
            error={Boolean(myError?.password)}
            helperText={myError?.password}
            margin="normal"
            color="secondary"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm your Password"
            type="password"
            id="confirmPassword"
            autoComplete="new-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Container sx={{ display: "flex", justifyContent: "center" }}>
            <Link color="secondary" href="/login" align="center">
              {"Already have an account? Login instead"}
            </Link>
          </Container>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUp;
