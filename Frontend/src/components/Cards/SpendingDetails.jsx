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
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";
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
    color: "bg-red-500",
    chartColor: "#ef4444",
  },
  {
    name: "Transportation",
    amount: 567.89,
    icon: DirectionsCar,
    color: "bg-blue-500",
    chartColor: "#3b82f6",
  },
  {
    name: "Shopping",
    amount: 890.12,
    icon: ShoppingCart,
    color: "bg-green-500",
    chartColor: "#22c55e",
  },
  {
    name: "Entertainment",
    amount: 345.67,
    icon: SportsEsports,
    color: "bg-purple-500",
    chartColor: "#a855f7",
  },
  {
    name: "Bills & Utilities",
    amount: 234.56,
    icon: Home,
    color: "bg-orange-500",
    chartColor: "#f97316",
  },
  {
    name: "Business",
    amount: 123.45,
    icon: Work,
    color: "bg-indigo-500",
    chartColor: "#6366f1",
  },
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const value = payload[0].value;
    const name = payload[0].name;
    return (
      <div className="bg-white p-3 shadow-lg rounded-lg border border-gray-200">
        <p className="font-medium">{name}</p>
        <p className="text-sm text-gray-600">${value.toLocaleString()}</p>
        <p className="text-xs text-gray-500">
          {((value / currentMonthStats.expenses) * 100).toFixed(1)}% of total
        </p>
      </div>
    );
  }
  return null;
};

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
        <Box height={250}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categories}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="amount"
                nameKey="name"
                isAnimationActive={false}
              >
                {categories.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.chartColor} />
                ))}
              </Pie>
              <Legend
                layout="horizontal"
                verticalAlign="bottom"
                align="center"
                formatter={(value) => <span className="text-xs">{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </Box>

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
              mt={2}
            >
              <Box display="flex" alignItems="center" gap={2}>
                <Avatar
                  sx={{
                    bgcolor: category.color,
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
