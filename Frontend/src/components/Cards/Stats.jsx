import React from "react";
import { Card, CardHeader, CardContent, Typography } from "@mui/material";
import {
  TrendingUp,
  TrendingDown,
  ArrowUpward,
  ArrowDownward,
} from "@mui/icons-material";

const Stats = ({ title, data }) => {
  const { current = "N.A", change = 0 } = data || {};

  const isPositive = change > 0;
  const isNegative = change < 0;

  const ChangeIcon = isPositive
    ? ArrowUpward
    : isNegative
    ? ArrowDownward
    : null;

  const TrendIcon = isPositive ? TrendingUp : isNegative ? TrendingDown : null;

  return (
    <Card sx={{ borderRadius: "0.5rem", border: "1px solid #e4e4e7" }}>
      <CardHeader
        title={
          <Typography variant="body2" fontWeight="medium">
            {title || "N.A"}
          </Typography>
        }
        action={
          ChangeIcon && (
            <ChangeIcon
              fontSize="small"
              sx={{ color: isPositive ? "success.main" : "error.main" }}
            />
          )
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
          sx={{ color: isPositive ? "success.main" : "error.main", mb: 0.5 }}
        >
          {current}
        </Typography>

        <Typography variant="caption" color="text.secondary">
          {TrendIcon && (
            <TrendIcon
              fontSize="inherit"
              sx={{ mr: 0.5, verticalAlign: "middle" }}
            />
          )}
          {`${Math.abs(change)}% from last month`}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Stats;
