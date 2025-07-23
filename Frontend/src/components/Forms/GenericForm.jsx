import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  MenuItem,
  Typography,
  Alert,
  Paper,
  Avatar,
} from "@mui/material";
import { fileToBase64 } from "../../utils/convertBase64";
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
  const [imagePreviews, setImagePreviews] = useState({});
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

  const handleChange = async (e) => {
    const { name, value, files, type } = e.target;

    if (type === "file" && files.length > 0) {
      const file = files[0];
      const base64 = await fileToBase64(file);
      setFormValues((prev) => ({ ...prev, [name]: base64 }));
      setImagePreviews((prev) => ({ ...prev, [name]: base64 }));
    } else {
      setFormValues((prev) => ({ ...prev, [name]: value }));
    }

    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async () => {
    setButtonDisabled(true);
    setSuccess("");
    setErrors({});

    if (!validate()) {
      setButtonDisabled(false);
      return;
    }

    try {
      await onSubmit(formValues);
      setSuccess("Submitted successfully.");
      setFormValues(initialState);
      setImagePreviews({});
      navigate(redirectUrl);
    } catch (err) {
      const apiMessage =
        err?.response?.data?.message || err?.message || "Submission failed.";
      setErrors({ form: apiMessage });
    }

    setButtonDisabled(false);
  };

  return (
    <Box>
      <Paper
        sx={{
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
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
                placeholder={label}
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

          if (type === "file") {
            return (
              <Box
                key={field}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                  alignItems: "center",
                }}
              >
                <Typography variant="body2" display={"none"}>
                  {label}
                </Typography>
                {
                  <Avatar
                    alt="preview"
                    src={imagePreviews[field]}
                    sx={{ width: 64, height: 64 }}
                  />
                }
                <Button variant="outlined" component="label">
                  Upload {label}
                  <input
                    hidden
                    type="file"
                    name={field}
                    accept="image/*"
                    onChange={handleChange}
                  />
                </Button>
                {errors[field] && (
                  <Typography variant="caption" color="error">
                    {errors[field]}
                  </Typography>
                )}
              </Box>
            );
          }

          return (
            <TextField
              key={field}
              type={type}
              name={field}
              label={label}
              value={formValues[field]}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
              placeholder={label}
              onChange={handleChange}
              error={!!errors[field]}
              helperText={errors[field]}
              fullWidth
            />
          );
        })}

        <Box sx={{ display: "flex", gap: 5 }}>
          <Button
            variant="outlined"
            onClick={() => {
              setFormValues(initialState);
              setImagePreviews({});
              setErrors({});
              setSuccess("");
            }}
            fullWidth
          >
            Reset
          </Button>
          <Button
            variant="contained"
            fullWidth
            disabled={isLoading || buttonDisabled}
            onClick={handleSubmit}
          >
            {isLoading ? "Submitting..." : submitLabel}
          </Button>
        </Box>

        {errors.form && <Alert severity="error">{errors.form}</Alert>}
        {success && <Alert severity="success">{success}</Alert>}
      </Paper>
    </Box>
  );
};

export default GenericForm;
