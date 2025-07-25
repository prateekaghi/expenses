import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  useTheme,
} from "@mui/material";

const EmptyResults = ({
  title = "No Results Found",
  description = "Try adjusting your filters or search.",
  IconComponent,
  showAction = false,
  onAction,
  actionLabel = "Retry",
}) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        borderRadius: "0.5rem",
        border: "1px solid #e4e4e7",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <CardContent>
        <Box
          sx={{
            mx: "auto",
            mb: 2,
            display: "flex",
            height: 64,
            width: 64,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
          }}
        >
          {IconComponent && (
            <IconComponent
              sx={{ fontSize: 64, color: theme.palette.text.secondary }}
            />
          )}
        </Box>
        <Typography variant="h6" fontWeight={500}>
          {title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 1, maxWidth: 360, mx: "auto" }}
        >
          {description}
        </Typography>

        {showAction && onAction && (
          <Button variant="outlined" sx={{ mt: 3 }} onClick={onAction}>
            {actionLabel}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default EmptyResults;
