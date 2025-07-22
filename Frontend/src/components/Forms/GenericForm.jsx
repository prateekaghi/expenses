// components/GenericForm.js

import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  MenuItem,
  Typography,
  Alert,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const GenericForm = ({
  initialState = {},
  validationRules = {},
  fieldConfigs = {},
  onSubmit,
  submitLabel = "Submit",
  isLoading = false,
  redirectUrl = "/",
}) => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState(initialState);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const validate = () => {
    const newErrors = {};

    for (const key in validationRules) {
      const value = formValues[key];
      const rules = validationRules[key];

      if (rules.required && (!value || value.toString().trim() === "")) {
        newErrors[key] = rules.message || `${key} is required`;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setErrors({});

    if (!validate()) return;

    try {
      await onSubmit(formValues);
      setSuccess("Submitted successfully.");
      setFormValues(initialState);
      setButtonDisabled(true);
      setTimeout(() => {
        navigate(redirectUrl);
        setButtonDisabled(false);
      }, 1500);
    } catch (err) {
      const apiMessage =
        err?.response?.data?.message || err?.message || "Submission failed.";
      setErrors({ form: apiMessage });
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Paper
        sx={{
          // maxWidth: 500,
          padding: 10,
          mx: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {Object.keys(initialState).map((field) => {
          const config = fieldConfigs[field] || {};
          const type = config.type || "text";
          const label = config.label || field[0].toUpperCase() + field.slice(1);

          if (type === "select") {
            return (
              <TextField
                key={field}
                name={field}
                label={label}
                select
                value={formValues[field]}
                onChange={handleChange}
                error={!!errors[field]}
                helperText={errors[field]}
                fullWidth
              >
                {config.options?.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            );
          }

          return (
            <TextField
              key={field}
              type={type}
              name={field}
              label={label}
              value={formValues[field]}
              onChange={handleChange}
              error={!!errors[field]}
              helperText={errors[field]}
              fullWidth
            />
          );
        })}

        <Button
          variant="contained"
          type="submit"
          disabled={isLoading || buttonDisabled}
        >
          {isLoading ? "Submitting..." : submitLabel}
        </Button>

        {errors.form && <Alert severity="error">{errors.form}</Alert>}
        {success && <Alert severity="success">{success}</Alert>}
      </Paper>
    </Box>
  );
};

export default GenericForm;
