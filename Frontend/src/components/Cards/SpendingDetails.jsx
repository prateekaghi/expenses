import React from "react";
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
  SentimentDissatisfiedOutlined,
} from "@mui/icons-material";
import { ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { useUserTransactionCategorySummary } from "../../hooks/useTransactions";
import EmptyResults from "./EmptyResults";

const currentMonthStats = {
  expenses: 3456.78,
  income: 6789.12,
  budget: 4000.0,
};
const chartColors = [
  "#ef4444",
  "#3b82f6",
  "#22c55e",
  "#a855f7",
  "#f97316",
  "#6366f1",
];

const SpendingDetails = () => {
  const { data, isLoading, isError, error, refetch } =
    useUserTransactionCategorySummary();

  if (isLoading) return <p>Loading.....</p>;
  if (isError) return <p>{error}</p>;

  return (
    <>
      {data.data.length > 0 ? (
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
                    data={data.data}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="amount"
                    nameKey="category"
                    isAnimationActive={false}
                  >
                    {data.data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={chartColors[index]} />
                    ))}
                  </Pie>
                  <Legend
                    layout="horizontal"
                    verticalAlign="bottom"
                    align="center"
                    formatter={(value) => (
                      <span className="text-xs">{value}</span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            </Box>

            {data.data.map((category, index) => {
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
                      {/* <Icon style={{ fontSize: 16, color: "#fff" }} /> */}
                    </Avatar>

                    <Box>
                      <Typography fontWeight={500}>
                        {category.category}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {category.percentage} % of {category.total}
                      </Typography>
                    </Box>
                  </Box>

                  <Box textAlign="right">
                    <Typography fontWeight={500}>
                      $ {category.amount.toLocaleString()}
                    </Typography>
                  </Box>
                </Box>
              );
            })}
          </CardContent>
        </Card>
      ) : (
        <EmptyResults
          title="Nothing to see here"
          description="Add Transaction to see category based expenses."
          IconComponent={SentimentDissatisfiedOutlined}
          showAction={true}
          onAction={() => refetch()}
          actionLabel="Reload"
        />
      )}
    </>
  );
};

export default SpendingDetails;
