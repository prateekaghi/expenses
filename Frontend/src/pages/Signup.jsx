import React, { useState, useCallback } from "react";
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
import debounce from "lodash.debounce";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../api/authApi";

const Signup = () => {
  const [userForm, setUserForm] = useState({
    first_name: {
      label: "First Name",
      input_type: "text",
      value: "",
      error: "",
      autoComplete: "given-name",
    },
    last_name: {
      label: "Last Name",
      input_type: "text",
      value: "",
      error: "",
      autoComplete: "family-name",
    },
    email: {
      label: "Email Address",
      input_type: "email",
      value: "",
      error: "",
      autoComplete: "email",
    },
    password: {
      label: "Password",
      input_type: "text",
      value: "",
      error: "",
      autoComplete: "new-password",
    },
    confirm_password: {
      label: "Confirm Password",
      input_type: "text",
      value: "",
      error: "",
      autoComplete: "new-password",
    },
  });

  const debouncedUpdate = useCallback(
    debounce((key, value) => {
      setUserForm((prevForm) => ({
        ...prevForm,
        [key]: {
          ...prevForm[key],
          value,
        },
      }));
    }, 300),
    []
  );

  const handleInput = (e, key) => {
    const { value } = e.target;
    debouncedUpdate(key, value);
  };
  const navigate = useNavigate();

  const validate = () => {
    let isValid = true;

    const updatedForm = { ...userForm };
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    Object.entries(userForm).forEach(([key, field]) => {
      const value = field.value.trim();

      // Start with no error
      updatedForm[key].error = "";

      // Check for empty
      if (!value) {
        updatedForm[key].error = `${field.label} is required`;
        isValid = false;
      }

      // Email format
      if (key === "email" && value && !emailRegex.test(value)) {
        updatedForm[key].error = "Please enter a valid email address";
        isValid = false;
      }

      // Password match
      if (
        key === "confirm_password" &&
        value &&
        value !== userForm["password"].value.trim()
      ) {
        updatedForm[key].error = "Passwords do not match";
        isValid = false;
      }

      // If there's an error, clear it after 3s
      if (updatedForm[key].error) {
        setTimeout(() => {
          setUserForm((prev) => ({
            ...prev,
            [key]: {
              ...prev[key],
              error: "",
            },
          }));
        }, 3000);
      }
    });

    setUserForm(updatedForm);
    return isValid;
  };

  const signUpHandler = async () => {
    syncBeforeSubmit();
    const validForm = validate();
    if (validForm) {
      const { email, first_name, last_name, password } = userForm;
      const response = await signupUser({
        email: email.value,
        first_name: first_name.value,
        last_name: last_name.value,
        password: password.value,
      });
    }
  };

  const syncBeforeSubmit = () => {
    const synced = { ...userForm };
    [
      "first_name",
      "last_name",
      "email",
      "password",
      "confirm_password",
    ].forEach((key) => {
      const el = document.querySelector(`input[name="${key}"]`);
      if (el && el.value && synced[key].value !== el.value) {
        synced[key].value = el.value;
      }
    });
    setUserForm(synced);
  };

  const handleGoogleSignup = () => {
    // TODO: Handle Google signup logic
    console.log("Signup with Google");
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
          Create a New Account
        </Typography>

        <Box sx={{ mt: 2 }}>
          {Object.entries(userForm).map(([key, value]) => {
            return (
              <TextField
                size="small"
                name={key}
                key={key}
                fullWidth
                label={value.label}
                required
                error={value.error}
                helperText={value.error}
                margin="normal"
                type={value.input_type}
                onChange={(e) => handleInput(e, key)}
                onBlur={(e) => handleInput(e, key)}
                autoComplete={value.autoComplete}
              />
            );
          })}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            onClick={signUpHandler}
          >
            Sign Up
          </Button>
        </Box>

        <Divider sx={{ my: 3 }}>OR</Divider>

        <Button
          variant="outlined"
          startIcon={<GoogleIcon />}
          fullWidth
          onClick={handleGoogleSignup}
        >
          Sign up with Google
        </Button>

        <Stack direction="row" justifyContent="center" mt={3}>
          <Typography variant="body2">
            Already have an account?{" "}
            <Link
              component="button"
              variant="body2"
              onClick={() => navigate("/login")}
            >
              Log in
            </Link>
          </Typography>
        </Stack>
      </Paper>
    </Box>
  );
};

export default Signup;
