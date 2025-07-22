import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Box,
  LinearProgress,
} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
const ProgressStat = () => {
  return (
    <Card sx={{ borderRadius: "0.5rem", border: "1px solid #e4e4e7" }}>
      <CardHeader
        title={
          <Typography variant="body2" fontWeight="medium">
            This Month Expenses
          </Typography>
        }
        action={<CalendarTodayIcon fontSize="small" color="action" />}
        sx={{
          pb: 1,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      />
      <CardContent>
        <Typography variant="h5" fontWeight="bold">
          3456.78
        </Typography>

        <Box mt={2}>
          <LinearProgress
            variant="determinate"
            value={60}
            sx={{ height: 8, borderRadius: 1 }}
          />
          <Typography
            variant="caption"
            color="text.secondary"
            mt={1}
            display="block"
          >
            80% of $ 5000 budget
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProgressStat;
