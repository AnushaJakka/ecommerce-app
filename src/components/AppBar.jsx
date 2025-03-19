import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Paper,
  InputBase,
  IconButton,
  Badge,
  Box,
  Tooltip,
  Avatar,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { ShoppingCart, Search, Menu as MenuIcon } from "@mui/icons-material";
import CustomDrawer from "./Drawer";

const settings = ["Profile", "Account", "Logout"];

const CustomAppBar = ({ cartLength, onToggleCart, searchQuery, onSearchChange, categories, onSelectCategory }) => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleDrawerToggle = () => setDrawerOpen(!drawerOpen);
  const handleCloseDrawer = () => setDrawerOpen(false);

 
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  return (
    <div>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {isMobile && (
              <IconButton color="inherit" onClick={handleDrawerToggle}>
                <MenuIcon />
              </IconButton>
            )}
            <Typography variant="h6" sx={{ fontWeight: 700, color: "white" }}>
              <Box component="span" color="secondary.main">E</Box>COMMERCE
            </Typography>
          </Box>

          
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {!isMobile && (
              <Paper component="form" sx={{ width: 300, borderRadius: 2, border: "1px solid #ddd" }}>
                <InputBase
                  placeholder="Search..."
                  sx={{ ml: 2, flex: 1 }}
                  value={searchQuery}
                  onChange={onSearchChange}
                />
                <IconButton type="button" sx={{ p: 1 }}>
                  <Search />
                </IconButton>
              </Paper>
            )}

            {/* Cart Icon */}
            <IconButton color="inherit" onClick={onToggleCart}>
              <Badge badgeContent={cartLength} color="secondary">
                <ShoppingCart />
              </Badge>
            </IconButton>

            {/* Profile Menu */}
            <Tooltip title="Profile">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="User" src="/avatar.avif" />
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorElUser}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
              sx={{ mt: "45px" }}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      
      <CustomDrawer
        open={drawerOpen}
        onClose={handleCloseDrawer}
        categories={categories}
        selectedCategory={null}
        onSelectCategory={onSelectCategory}
      />
    </div>
  );
};

export default CustomAppBar;