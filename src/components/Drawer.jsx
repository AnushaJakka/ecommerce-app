// CustomDrawer.jsx
import React from "react";
import {
  Drawer,
  Box,
  List,
  ListItemButton,
  ListItemText,
  useMediaQuery,
  useTheme,
  IconButton,
  Avatar,
  Tooltip,
} from "@mui/material";
import SmallComponent from "./SmallComponent";

const CustomDrawer = ({ 
  open, 
  onClose, 
  categories, 
  selectedCategory, 
  onSelectCategory,
  handleOpenUserMenu,
  toggleDark,
  setToggleDark,
  isMobile
}) => {
  const theme = useTheme();

  const handleCategoryClick = (category) => {
    onSelectCategory(category);
    if (isMobile) onClose();
  };

  return (
    <Drawer
      variant={isMobile ? "temporary" : "permanent"}
      open={isMobile ? open : true}
      onClose={onClose}
      sx={{
        "& .MuiDrawer-paper": {
          width: 250,
          boxSizing: "border-box",
          top: isMobile ? "0" : "64px",
          backgroundColor: "#1c2529",
        },
      }}
    >
      <Box sx={{ p: 2, display: "flex", flexDirection: "column", height: "100%" }}>
        <List sx={{ flexGrow: 1 }}>
          <ListItemButton
            selected={!selectedCategory}
            onClick={() => handleCategoryClick(null)}
            sx={{
              "&.Mui-selected": {
                backgroundColor: "transparent",
                "&:hover": { backgroundColor: "transparent" }
              }
            }}
          >
            <ListItemText
              primary="All Categories"
              primaryTypographyProps={{
                sx: {
                  mt: 3,
                  color: "#fff",
                  fontWeight: "bold",
                },
              }}
            />
          </ListItemButton>
          {categories.map((category) => (
            <ListItemButton
              key={category}
              selected={selectedCategory === category}
              onClick={() => handleCategoryClick(category)}
              sx={{
                "&.Mui-selected": {
                  backgroundColor: "rgba(0, 0, 255, 0.1)",
                },
              }}
            >
              <ListItemText
                primary={category}
                primaryTypographyProps={{
                  sx: {
                    color: "#fff",
                    fontWeight: "bold",
                    textTransform: "capitalize"
                  },
                }}
              />
            </ListItemButton>
          ))}
        </List>

        {/* Mobile-only drawer footer */}
        {isMobile && (
          <Box sx={{ 
            mt: "auto",
            borderTop: "1px solid rgba(255, 255, 255, 0.12)",
            pt: 2,
            display: "flex",
            justifyContent: "space-around",
            alignItems: "top"
          }}>
            <Tooltip title="Profile">
              <IconButton onClick={handleOpenUserMenu}>
              <Avatar alt="User" src="/images.png" />
             </IconButton>
            </Tooltip>
            <SmallComponent
  toggleDark={toggleDark}
  setToggleDark={setToggleDark}
  // sx={{
  //   backgroundColor: toggleDark ? "#ffffff" : "#1e1e1e", // Hardcoded dark/light colors
  //   color: toggleDark ? "#000000" : "#ffffff", // Hardcoded text colors
  //   '&:hover': {
  //     backgroundColor: toggleDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.04)", // Hardcoded hover states
  //   }
  // }}
/>
          </Box>
        )}
      </Box>
    </Drawer>
  );
};

export default CustomDrawer;