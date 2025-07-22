import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Box,
  Avatar,
} from "@mui/material";
import {
  Restaurant,
  SportsEsports,
  Home,
  ShoppingCart,
  DirectionsCar,
  Work,
} from "@mui/icons-material";
import React from "react";

const currentMonthStats = {
  expenses: 3456.78,
  income: 6789.12,
  budget: 4000.0,
};
const categories = [
  {
    name: "Food & Dining",
    amount: 1234.56,
    icon: Restaurant,
    color: "error.main",
  },
  {
    name: "Transportation",
    amount: 567.89,
    icon: DirectionsCar,
    color: "info.main",
  },
  {
    name: "Shopping",
    amount: 890.12,
    icon: ShoppingCart,
    color: "success.main",
  },
  {
    name: "Entertainment",
    amount: 345.67,
    icon: SportsEsports,
    color: "secondary.main",
  },
  {
    name: "Bills & Utilities",
    amount: 234.56,
    icon: Home,
    color: "warning.main",
  },
  { name: "Business", amount: 123.45, icon: Work, color: "primary.main" },
];

const SpendingDetails = () => {
  return (
    <Card sx={{ borderRadius: "0.5rem", border: "1px solid #e4e4e7" }}>
      <CardHeader
        title={
          <Typography variant="h6" fontWeight="medium">
            Spending by Category
          </Typography>
        }
        subheader={
          <Typography variant="body2" color="text.secondary">
            Your top spending categories this month
          </Typography>
        }
      />

      <CardContent>
        {categories.map((category, index) => {
          const Icon = category.icon;
          const percentage = (
            (category.amount / currentMonthStats.expenses) *
            100
          ).toFixed(1);

          return (
            <Box
              key={index}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              mb={2}
            >
              <Box display="flex" alignItems="center" gap={2}>
                <Avatar
                  sx={{
                    bgcolor: category.color, // e.g. 'primary.main' or '#3b82f6'
                    width: 32,
                    height: 32,
                  }}
                  variant="rounded"
                >
                  <Icon style={{ fontSize: 16, color: "#fff" }} />
                </Avatar>

                <Box>
                  <Typography fontWeight={500}>{category.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {percentage}% of total
                  </Typography>
                </Box>
              </Box>

              <Box textAlign="right">
                <Typography fontWeight={500}>
                  ${category.amount.toLocaleString()}
                </Typography>
              </Box>
            </Box>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default SpendingDetails;
