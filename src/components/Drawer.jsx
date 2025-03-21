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
          backgroundColor: "#1c2529",
        },
      }}
    >
      <Box sx={{ p: 2 }}>
        {/* <Typography variant="h6" sx={{ mb: 2, color: "#FF0000" }}>
          CATEGORIES
        </Typography> */}
        <List>
          <ListItemButton
            selected={!selectedCategory}
            onClick={() => handleCategoryClick(null)}
          >
            <ListItemText
              primary="All Categories"
              primaryTypographyProps={{
                sx: {
                  mt:5,
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
                    textTransform:"capitalize"
                  },
                }}
              />
            </ListItemButton>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default CustomDrawer;