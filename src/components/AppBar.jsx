import React, { useState } from "react";
import SmallComponent from "./SmallComponent";
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
import { ShoppingCart, Search, Menu as MenuIcon, Close, ArrowBack } from "@mui/icons-material";
import CustomDrawer from "./Drawer";

const settings = ["Profile", "Account", "Logout"];

const CustomAppBar = ({ 
  cartLength = 0, 
  onToggleCart, 
  searchQuery = '', 
  onSearchChange = () => {}, 
  categories = [], 
  onSelectCategory = () => {}, 
  toggleDark,
  setToggleDark 
}) => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
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
          {/* Left Side - Always visible */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {isMobile && (
              <IconButton color="inherit" onClick={handleDrawerToggle}>
                <MenuIcon />
              </IconButton>
            )}
            {!isMobile && (
              <Typography variant="h6" sx={{ fontWeight: 700, color: "white" }}>
                <Box component="span" color="secondary.main">E</Box>COMMERCE
              </Typography>
            )}
          </Box>

          {/* Middle Section - Mobile Only */}
          {isMobile && !mobileSearchOpen && (
            <Box sx={{ 
              display: "flex", 
              alignItems: "center", 
              gap: 2,
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)'
            }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: "white" }}>
                <Box component="span" color="secondary.main">E</Box>COMMERCE
              </Typography>
              <IconButton 
                color="inherit" 
                onClick={() => setMobileSearchOpen(true)}
              >
                <Search />
              </IconButton>
            </Box>
          )}

          {/* Right Side */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {isMobile ? (
              mobileSearchOpen ? (
                <Paper 
                  component="form" 
                  sx={{ 
                    position: 'absolute',
                    top: 8,
                    left: 16,
                    right: 16,
                    display: 'flex',
                    alignItems: 'center',
                    borderRadius: '28px',
                    bgcolor: 'background.paper',
                    boxShadow: 3,
                    zIndex: theme.zIndex.modal
                  }}
                >
                  <IconButton 
                    onClick={() => setMobileSearchOpen(false)}
                    sx={{ p: 1, color: 'text.secondary' }}
                  >
                    <ArrowBack fontSize="small" />
                  </IconButton>
                  <InputBase
                    placeholder="Search products..."
                    fullWidth
                    autoFocus
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                  />
                  {searchQuery && (
                    <IconButton onClick={() => onSearchChange('')}>
                      <Close fontSize="small" />
                    </IconButton>
                  )}
                </Paper>
              ) : (
                <IconButton color="inherit" onClick={onToggleCart}>
                  <Badge badgeContent={cartLength} color="secondary">
                    <ShoppingCart />
                  </Badge>
                </IconButton>
              )
            ) : (
              // Desktop View with Search Button
              <>
                <Paper component="form" sx={{ 
                  width: 400, 
                  borderRadius: '28px', 
                  bgcolor: 'background.paper',
                  display: 'flex',
                  alignItems: 'center',
                  px: 2,
                  py: 0.5
                }}>
                  <InputBase
                    placeholder="Search products..."
                    fullWidth
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    sx={{ flex: 1 }}
                  />
                  <IconButton 
                    type="submit" 
                    color="primary"
                    sx={{ 
                      p: 1,
                      backgroundColor: 'primary.main',
                      '&:hover': {
                        backgroundColor: 'primary.dark'
                      }
                    }}
                  >
                    <Search sx={{ color: 'white' }} />
                  </IconButton>
                  {searchQuery && (
                    <IconButton 
                      onClick={() => onSearchChange('')}
                      sx={{ color: 'text.secondary' }}
                    >
                      <Close fontSize="small" />
                    </IconButton>
                  )}
                </Paper>

                <IconButton color="inherit" onClick={onToggleCart}>
                  <Badge badgeContent={cartLength} color="secondary">
                    <ShoppingCart />
                  </Badge>
                </IconButton>
                <Tooltip title="Profile">
                  <IconButton onClick={handleOpenUserMenu}>
                    <Avatar alt="User" src="/images.png" />
                  </IconButton>
                </Tooltip>
                <SmallComponent 
                  toggleDark={toggleDark} 
                  setToggleDark={setToggleDark} 
                />
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <CustomDrawer
        open={drawerOpen}
        onClose={handleCloseDrawer}
        categories={categories}
        selectedCategory={null}
        onSelectCategory={onSelectCategory}
        handleOpenUserMenu={handleOpenUserMenu}
        toggleDark={toggleDark}
        setToggleDark={setToggleDark}
        isMobile={isMobile}
      />

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
    </div>
  );
};

export default CustomAppBar;