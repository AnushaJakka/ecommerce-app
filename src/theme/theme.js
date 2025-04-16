import { createTheme } from "@mui/material/styles";

const baseTheme = createTheme({
  palette: {
    primary: { main: "#2A4D5B" },
    secondary: { main: "#FF7D7D" },
    background: {
      default: "#f5f5f5",
      paper: "#ffffff",
    },
    text: {
      primary: "#000000",
      secondary: "#757575",
    },
    action: {
      hover: "rgba(0, 0, 0, 0.04)"
    }
  },
  zIndex: {
    drawer: 1200,
    appBar: 1300,
    modal: 1400
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#f5f5f5",
          color: "#000000",
          width: 280,
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  ...baseTheme,
  palette: {
    mode: "dark",
    primary: { main: "#FF7D7D" },
    secondary: { main: "#2A4D5B" },
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#B0B0B0",
    },
    action: {
      hover: "rgba(255, 255, 255, 0.08)"
    }
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#2A2A2A",
          color: "#FFFFFF",
        },
      },
    },
  },
});

export default baseTheme;