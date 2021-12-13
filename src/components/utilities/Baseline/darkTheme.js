import { createTheme } from "@mui/material/styles";

// A custom theme for this app
const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#4c81ff",
    },
    secondary: {
      main: "#19857b",
    },
    navColor: {
      main: "#2d3446",
    },
    subColor: {
      main: "#373f4f",
    },
    normalWhite: {
      main: "#fff",
    },
    background: {
      default: "#081024",
    },
    mode: "dark",
  },
  typography: {
    fontFamily: ["Noto Sans", "sans-serif"].join(","),
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
  },
});

export default darkTheme;
