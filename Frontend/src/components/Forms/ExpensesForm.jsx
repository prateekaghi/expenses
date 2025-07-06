import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Container,
} from "@mui/material";
const getInitialState = () => ({
  date: {
    label: "Date",
    input_type: "date",
    value: "",
    error: "",
  },
  title: {
    label: "Title",
    input_type: "text",
    value: "",
    error: "",
  },
  category: {
    label: "Category",
    input_type: "select",
    value: "",
    options: ["Food", "Travel", "Utilities", "Shopping", "Other"],
    error: "",
  },
  amount: {
    label: "Amount",
    input_type: "number",
    value: "",
    error: "",
  },
  currency: {
    label: "Currency",
    input_type: "select",
    value: "",
    options: ["USD", "CAD", "INR", "EUR"],
    error: "",
  },
});

const ExpenseForm = ({ onSubmit, onCancel }) => {
  const [expenseForm, setExpenseForm] = useState(getInitialState());

  const handleInput = (e, key) => {
    const { value } = e.target;
    setExpenseForm((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        value,
      },
    }));
  };

  const validate = () => {
    let isValid = true;
    const updatedForm = { ...expenseForm };

    Object.entries(updatedForm).forEach(([key, field]) => {
      const val = field.value.toString().trim();
      updatedForm[key].error = "";

      if (!val) {
        updatedForm[key].error = `${field.label} is required`;
        isValid = false;
      } else if (key === "amount" && (isNaN(val) || Number(val) <= 0)) {
        updatedForm[key].error = "Amount must be a positive number";
        isValid = false;
      }
    });

    setExpenseForm(updatedForm);
    return isValid;
  };

  const submitHandler = () => {
    if (validate()) {
      const dataToSubmit = {};
      Object.entries(expenseForm).forEach(([key, field]) => {
        dataToSubmit[key] = field.value;
      });

      onSubmit(dataToSubmit);
      setExpenseForm(getInitialState()); // clear after submit (optional)
    }
  };

  return (
    <Container maxWidth="lg" sx={{ height: "100vh" }}>
      <Paper elevation={3} sx={{ p: 5 }}>
        <Typography variant="h5" align="center">
          Add Expense
        </Typography>
        <Stack spacing={{ xs: 1, md: 2 }}>
          {Object.entries(expenseForm).map(([key, value]) => {
            if (value.input_type === "select") {
              return (
                <FormControl
                  key={key}
                  size="small"
                  fullWidth
                  required
                  error={value.error}
                >
                  <InputLabel id={key + "label"} shrink>
                    {value.label}
                  </InputLabel>
                  <Select
                    id={key}
                    name={key}
                    size="small"
                    value={value.value}
                    label={value.label}
                    notched
                    onChange={(e) => handleInput(e, key)}
                  >
                    {value.options?.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                  {value.error && (
                    <Typography
                      color="error"
                      variant="caption"
                      sx={{ mt: 0.5 }}
                    >
                      {value.error}
                    </Typography>
                  )}
                </FormControl>
              );
            }
            return (
              <TextField
                key={key}
                name={value.label}
                label={value.label}
                type={value.input_type}
                fullWidth
                size="small"
                required
                error={value.error}
                helperText={value.error}
                // value={expenseForm.date.value}
                onChange={(e) => handleInput(e, key)}
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
              />
            );
          })}
        </Stack>
        <Stack
          direction="row"
          spacing={2}
          justifyContent="flex-end"
          sx={{ mt: 2 }}
        >
          <Button
            sx={{ width: "25%" }}
            variant="outlined"
            color="secondary"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button
            sx={{ width: "25%" }}
            variant="contained"
            color="primary"
            onClick={submitHandler}
          >
            Submit
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
};

export default ExpenseForm;
