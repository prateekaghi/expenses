import React, { useState } from "react";
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
import { useLoginAuth } from "../hooks/useAuth";

const initialState = {
  email: { value: "", error: "" },
  password: { value: "", error: "" },
};

const Login = () => {
  const { mutate, isSuccess, isError, error } = useLoginAuth();
  const [formData, setFormData] = useState(initialState);
  const navigate = useNavigate();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: { ...prev[name], value, error: "" }, // Clear error on change
    }));
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

        <Box sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            margin="normal"
            size="small"
            onChange={inputHandler}
            name="email"
            value={formData.email.value}
            error={!!formData.email.error}
            helperText={formData.email.error}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            margin="normal"
            size="small"
            name="password"
            onChange={inputHandler}
            value={formData.password.value}
            error={!!formData.password.error}
            helperText={formData.password.error}
          />

          <Box textAlign="right" mt={1} mb={2}>
            <Link component="button" variant="body2">
              Forgot Password?
            </Link>
          </Box>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => {
              mutate({
                email: formData.email.value,
                password: formData.password.value,
              });
            }}
          >
            Login
          </Button>
        </Box>

        <Divider sx={{ my: 3 }}>OR</Divider>

        <Button variant="outlined" startIcon={<GoogleIcon />} fullWidth>
          Sign in with Google
        </Button>

        <Stack direction="row" justifyContent="center" mt={3}>
          <Typography variant="body2">
            Don't have an account?{" "}
            <Link
              component="button"
              variant="body2"
              onClick={() => navigate("/signup")}
            >
              Sign up
            </Link>
          </Typography>
        </Stack>

        <Button
          variant="outlined"
          fullWidth
          onClick={() => navigate("/")}
          sx={{ marginTop: 2 }}
        >
          Go to Homepage
        </Button>
      </Paper>
    </Box>
  );
};

export default Login;
