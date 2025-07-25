import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  MenuList,
  ListItemIcon,
  ListItemText,
  Divider,
  Chip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

const UserHeader = () => {
  const auth = useAuthStore.getState();
  console.log("auth", auth);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: "#fff",
        borderBottom: "1px solid #e5e7eb", // Tailwind's border-gray-200
        px: 3,
        py: 2,
      }}
    >
      <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
        {/* Left Side */}
        <Box display="flex" alignItems="center" gap={2}>
          <Typography variant="h5" fontWeight="bold" color="text.primary">
            ExpenseTracker
          </Typography>
          <Chip label="Pro Plan" variant="outlined" size="small" />
        </Box>

        {/* Right Side */}
        <Box display="flex" alignItems="center" gap={2}>
          <Button
            variant="outlined"
            size="small"
            startIcon={<AddIcon fontSize="small" />}
            onClick={() => {
              navigate("/transactions/add");
            }}
          >
            Add Transaction
          </Button>

          {/* Avatar & Menu */}
          <IconButton onClick={handleAvatarClick} sx={{ p: 0 }}>
            <Avatar
              alt="User"
              src={auth.profile_image}
              sx={{ width: 32, height: 32 }}
            />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            PaperProps={{ sx: { width: 220 } }}
          >
            <MenuList dense>
              <Box px={2} py={1}>
                <Typography variant="body1" fontWeight="medium">
                  {auth.first_name} {auth.last_name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {auth.email}
                </Typography>
              </Box>
              <Divider />
              <MenuItem
                onClick={() => {
                  navigate("/profile");
                }}
              >
                <ListItemIcon>
                  <SettingsIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Settings</ListItemText>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  auth.clearAuth();
                }}
              >
                Log out
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default UserHeader;
