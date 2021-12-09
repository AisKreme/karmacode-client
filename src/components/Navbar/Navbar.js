import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import { Link } from "react-router-dom";
import "./Navbar";

const Navbar = (props) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          ></IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link
              underline="none"
              color="white"
              to="/"
              style={{ marginLeft: "10px" }}
            >
              Karmacode
            </Link>
          </Typography>
          {props.user ? (
            <Button onClick={props.onLogout}>Logout</Button>
          ) : (
            <>
              <Button color="inherit">
                <Link style={{ marginLeft: "10px" }} to="/login">
                  Login
                </Link>
              </Button>
              <Button color="inherit">
                <Link style={{ marginLeft: "10px" }} to="/signup">
                  SignUp
                </Link>
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default Navbar;
