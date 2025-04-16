import React from "react";
import { IconButton } from "@mui/material";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

const SmallComponent = ({ toggleDark, setToggleDark }) => {
  return (
    <IconButton 
      onClick={() => setToggleDark(!toggleDark)} 
      color="inherit"
      sx={{ ml: 1,
        
        color: toggleDark ? "#000000" :  "#ffffff",
        // borderRadius: "50%",

        '&:hover': {
          backgroundColor: toggleDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.04)",
        },
       }} 
    >
      {toggleDark ? <DarkModeIcon /> : <LightModeIcon/>}
    </IconButton>
  );
};

export default SmallComponent;