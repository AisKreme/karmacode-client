import { AppBar, Box, Toolbar, Button, Container } from "@mui/material";
import Link from "@mui/material/Link";
import "./Navbar";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { useContext } from "react";
import { UserContext } from "../../context/app.context";

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

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ bgcolor: "navColor.main" }}>
        <Toolbar>
          <Container
            style={{
              display: "flex",
              justifyContent: "flex-start",
            }}
            component="div"
            sx={{
              padding: "0 20px 0 5px",
              alignItems: "center",
            }}
          >
            <Link
              variant="h5"
              underline="none"
              href="/"
              sx={{ color: "normalWhite.main" }}
              style={{
                margin: "20px",
              }}
            >
              Karmacode.
            </Link>

            <Container
              component="div"
              style={{
                display: "flex",
                margin: "20px",
                borderRight: "3px solid #373f4f",
                borderLeft: "3px solid #373f4f",
                maxWidth: "250px",
                marginLeft: "50px",
                marginRight: "50px",
              }}
            >
              <Button
                sx={{ borderRadius: "20px" }}
                style={{ margin: "0 auto" }}
                color="primary"
                variant="contained"
                href="/"
              >
                Start
              </Button>
              <Button
                sx={{ borderRadius: "20px" }}
                style={{ margin: "0 auto" }}
                color="primary"
                variant="contained"
                href="/map"
              >
                Map
              </Button>
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
                  <Button
                    startIcon={<AddCircleIcon />}
                    sx={{ borderRadius: "20px" }}
                    style={{ marginRight: "20px" }}
                    color="primary"
                    variant="contained"
                    href="/create-organisation"
                  >
                    Create an Organisation
                  </Button>
                  <Button
                    onClick={props.onLogout}
                    sx={{ borderRadius: "20px" }}
                    style={{ marginRight: "20px" }}
                    color="primary"
                    variant="contained"
                    href="/"
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    sx={{ borderRadius: "20px" }}
                    style={{ marginRight: "20px" }}
                    color="primary"
                    variant="contained"
                    href="/login"
                  >
                    Login
                  </Button>

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
                    href="/signup"
                  >
                    SignUp
                  </Button>
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
