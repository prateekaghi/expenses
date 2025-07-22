import React from "react";
import { Card, CardHeader, CardContent, Typography, Box } from "@mui/material";
const CategorySummary = ({ title, totalRecords, icon, subtitle }) => {
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
            {title}
          </Typography>
        }
        action={icon}
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
          {totalRecords}
        </Typography>

        <Box mt={2}>
          <Typography
            variant="caption"
            color="text.secondary"
            mt={1}
            display="block"
          >
            {subtitle}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CategorySummary;
