import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";

const Stats = () => {
  return (
    <Card sx={{ borderRadius: "0.5rem", border: "1px solid #e4e4e7" }}>
      <CardHeader
        title={
          <Typography variant="body2" fontWeight="medium">
            Total Lifetime Expense
          </Typography>
        }
        action={
          <ArrowDownwardIcon fontSize="small" sx={{ color: "error.main" }} />
        }
        sx={{
          pb: 1,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      />
      <CardContent>
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{ color: "error.main", mb: 0.5 }}
        >
          Number
        </Typography>
        <Typography variant="caption" color="text.secondary">
          <TrendingDownIcon
            fontSize="inherit"
            sx={{ mr: 0.5, verticalAlign: "middle" }}
          />
          -2.5% from last month
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Stats;
