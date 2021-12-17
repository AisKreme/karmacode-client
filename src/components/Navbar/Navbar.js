import {
  AppBar,
  Box,
  Toolbar,
  Button,
  Container,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import MuiLink from "@mui/material/Link";
import "./Navbar";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { useContext } from "react";
import { UserContext } from "../../context/app.context";
import { LandingContext } from "../../context/landing.context";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const Navbar = (props) => {
  const { user } = useContext(UserContext);
  const { landing, setLanding } = useContext(LandingContext);

  const toggleLandingON = () => {
    setLanding(true);
  };
  const toggleLandingOFF = () => {
    setLanding(false);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ bgcolor: "navColor.main" }}>
        <Toolbar>
          <Container
            style={{
              display: "flex",
              justifyContent: "flex-start",
              padding: "0",
            }}
            component="div"
            sx={{
              alignItems: "center",
            }}
          >
            <Link
              to="/"
              style={{
                textDecoration: "none",
              }}
            >
              <MuiLink
                variant="h5"
                underline="none"
                sx={{ color: "normalWhite.main" }}
                style={{}}
              >
                Karmacode.
              </MuiLink>
            </Link>

            <Container
              component="div"
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                margin: "20px",
                borderRight: "3px solid #373f4f",
                borderLeft: "3px solid #373f4f",
                maxWidth: "250px",
                marginLeft: "50px",
                marginRight: "50px",
              }}
            >
              <Link
                to="/"
                style={{
                  textDecoration: "none",
                }}
                onClick={toggleLandingON}
              >
                <Button
                  sx={{ borderRadius: "20px" }}
                  style={{ margin: "0 auto" }}
                  color="primary"
                  variant="contained"
                >
                  Start
                </Button>
              </Link>
              <Link
                onClick={toggleLandingOFF}
                to="/"
                style={{
                  textDecoration: "none",
                }}
              >
                <Button
                  sx={{ borderRadius: "20px" }}
                  style={{ margin: "0 auto" }}
                  color="primary"
                  variant="contained"
                >
                  Map
                </Button>
              </Link>
            </Container>

            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
            <Container sx={{ display: "flex", justifyContent: "flex-end" }}>
              {user ? (
                <>
                  {user.organisation ? (
                    <Link
                      to="/manage-organisation"
                      style={{
                        textDecoration: "none",
                      }}
                    >
                      <Button
                        sx={{ borderRadius: "20px" }}
                        style={{ marginRight: "20px" }}
                        color="secondary"
                        variant="contained"
                      >
                        Manage your Organisation
                      </Button>
                    </Link>
                  ) : (
                    <Link
                      to="create-organisation"
                      style={{
                        textDecoration: "none",
                      }}
                    >
                      <Button
                        startIcon={<AddCircleIcon />}
                        sx={{ borderRadius: "20px" }}
                        style={{ marginRight: "20px" }}
                        color="primary"
                        variant="contained"
                      >
                        Create an Organisation
                      </Button>
                    </Link>
                  )}

                  <Button
                    onClick={props.onLogout}
                    sx={{ borderRadius: "20px" }}
                    style={{ marginLeft: "20px" }}
                    color="primary"
                    variant="contained"
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link
                    to="login"
                    style={{
                      textDecoration: "none",
                    }}
                  >
                    <Button
                      sx={{ borderRadius: "20px" }}
                      style={{ marginRight: "20px" }}
                      color="primary"
                      variant="contained"
                    >
                      Login
                    </Button>
                  </Link>
                  <Link
                    to="/signup"
                    style={{
                      textDecoration: "none",
                    }}
                  >
                    <Button
                      startIcon={<AddCircleIcon />}
                      sx={{ borderRadius: "20px" }}
                      style={{
                        marginLeft: "10px",
                        marginRight: "10px",
                        padding: "6px 20px",
                      }}
                      color="secondary"
                      variant="contained"
                    >
                      SignUp
                    </Button>
                  </Link>
                </>
              )}
            </Container>
          </Container>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default Navbar;
