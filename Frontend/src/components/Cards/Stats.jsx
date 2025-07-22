import React from "react";
import { Card, CardHeader, CardContent, Typography } from "@mui/material";
import {
  TrendingUp,
  TrendingDown,
  ArrowUpward,
  ArrowDownward,
  SavingsOutlined,
} from "@mui/icons-material";

const Stats = ({ title, data, color = "error.main", icon = "default" }) => {
  const { total = "N.A", change = 0 } = data || {};

  const isPositive = change > 0;
  const isNegative = change < 0;

  const ChangeIcon =
    icon === "income"
      ? ArrowUpward
      : icon === "expense"
      ? ArrowDownward
      : icon === "monthly-expense"
      ? TrendingDown
      : icon === "monthly-income"
      ? TrendingUp
      : SavingsOutlined;

  const TrendIcon = isPositive ? TrendingUp : isNegative ? TrendingDown : null;

  return (
    <Card
      sx={{
        borderRadius: "0.5rem",
        border: "1px solid #e4e4e7",
        height: "100%",
      }}
    >
      <CardHeader
        title={
          <Typography variant="body2" fontWeight="medium">
            {title || "N.A"}
          </Typography>
        }
        action={
          ChangeIcon && <ChangeIcon fontSize="small" sx={{ color: color }} />
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
        <Typography variant="h5" fontWeight="bold" sx={{ color, mb: 0.5 }}>
          {`${data?.currencySymbol} ${total}`}
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
