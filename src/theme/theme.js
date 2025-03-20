import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2A4D5B",
    },
    secondary: {
      main: "#FF7D7D",
    },
    background: {
      default: "#f5f5f5",
    },
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
    h4: {
      fontWeight: 600,
      color: "#2A4D5B",
    },
    h5: {
      fontWeight: 600,
      color: "#2A4D5B",
    },
    body1: {
      color: "black",
      fontWeight:"bold",
    },
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#D9D9D9",
          color: "#003366",
          fontWeight: "bold",
          width: 280,
        },
      },
    },
  },
});

export default theme;