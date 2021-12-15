import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";

const Login = (props) => {
  const { onLogin } = props;
  const { myError } = props;
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
        <Typography component="h1" variant="h5" align="center">
          Login
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={onLogin}>
          <TextField
            error={Boolean(myError?.username)}
            helperText={myError?.username}
            margin="normal"
            color="secondary"
            required
            fullWidth
            id="userInput"
            label="Username or Email Address"
            name="userInput"
            autoComplete="off"
            autoFocus
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
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
          <Container sx={{ display: "flex", justifyContent: "center" }}>
            <Link color="secondary" href="/signup" align="center">
              {"Don't have an account? Sign Up"}
            </Link>
          </Container>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
