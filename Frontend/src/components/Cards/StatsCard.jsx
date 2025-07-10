import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Box, useTheme } from "@mui/material";
import { ArrowUpward, ArrowDownward } from "@mui/icons-material";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import { calculateMonthlyGrowth } from "../../utils/calculations";
import { generateDailyChartData } from "../../utils/chartCalculations";

const StatsCard = ({ title, period, data }) => {
  const [chartData, setChartData] = useState(null);
  const dataGrowth = calculateMonthlyGrowth(data);

  useEffect(() => {
    if (data.length > 0) {
      setChartData(generateDailyChartData(data));
    }
  }, [data]);

  const theme = useTheme();
  const isPositive = dataGrowth.growth >= 0;

  return (
    <Card
      sx={{
        borderRadius: 3,
        p: 2,
        boxShadow: 3,
        minWidth: 250,
      }}
    >
      <CardContent sx={{ p: 0 }}>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          {title}
        </Typography>

        <Typography variant="h5" fontWeight={600}>
          {data.length}
        </Typography>

        <Box display="flex" alignItems="center" gap={1} mt={1}>
          {isPositive ? (
            <ArrowUpward fontSize="small" color="success" />
          ) : (
            <ArrowDownward fontSize="small" color="error" />
          )}
          <Typography
            variant="body2"
            color={isPositive ? "success.main" : "error.main"}
          >
            {Math.abs(dataGrowth.growth)}%
          </Typography>
          <Typography variant="body2" color="text.secondary" ml="auto">
            {period}
          </Typography>
        </Box>

        <Box height={60} mt={2}>
          <ResponsiveContainer width="100%" height="100%">
            {chartData && (
              <LineChart data={chartData}>
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={
                    isPositive
                      ? theme.palette.success.main
                      : theme.palette.error.main
                  }
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            )}
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
