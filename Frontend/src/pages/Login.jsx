import React from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Divider,
  Link,
  Stack,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Handle login logic
  };

  const handleGoogleLogin = () => {
    // TODO: Handle Google login logic
    console.log("Login with Google");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f5f5f5",
        px: 2,
      }}
    >
      <Paper elevation={4} sx={{ p: 4, width: "100%", maxWidth: 400 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Sign In to Your Account
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            margin="normal"
            required
          />

          <Box textAlign="right" mt={1} mb={2}>
            <Link
              component="button"
              variant="body2"
              onClick={() => navigate("/forgot-password")}
            >
              Forgot Password?
            </Link>
          </Box>

          <Button type="submit" variant="contained" color="primary" fullWidth>
            Login
          </Button>
        </Box>

        <Divider sx={{ my: 3 }}>OR</Divider>

        <Button
          variant="outlined"
          startIcon={<GoogleIcon />}
          fullWidth
          onClick={handleGoogleLogin}
        >
          Sign in with Google
        </Button>

        <Stack direction="row" justifyContent="center" mt={3}>
          <Typography variant="body2">
            Don't have an account ?
            <Link
              component="button"
              variant="body2"
              onClick={() => navigate("/signup")}
            >
              Sign up
            </Link>
          </Typography>
        </Stack>
      </Paper>
    </Box>
  );
};

export default Login;
