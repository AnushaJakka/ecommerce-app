import React from "react";
import {
  Drawer,
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@mui/material";

const CustomDrawer = ({ open, onClose, categories, selectedCategory, onSelectCategory }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

 
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
           backgroundColor:"rgba(216, 25, 223, 0.15)"
        },
      }}
    >
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" sx={{ mb: 2, color: "#800080" }}>
          CATEGORIES
        </Typography>
        <List>
          <ListItemButton
            selected={!selectedCategory}
            onClick={() => handleCategoryClick(null)}
            sx={{
              "&.Mui-selected": { backgroundColor: "rgba(17, 236, 217, 0.15)" },
            }}
          >
            <ListItemText primary="All Categories" />
          </ListItemButton>

          {categories.map((category) => (
            <ListItemButton
              key={category}
              selected={selectedCategory === category}
              onClick={() => handleCategoryClick(category)}
              sx={{
                "&.Mui-selected": { backgroundColor: "rgba(16, 157, 222, 0.15)" },
              }}
            >
              <ListItemText primary={category} />
            </ListItemButton>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default CustomDrawer;