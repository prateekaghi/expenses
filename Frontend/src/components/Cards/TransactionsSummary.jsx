import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Box,
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  TableFooter,
  TablePagination,
  Chip,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import DownloadIcon from "@mui/icons-material/Download";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

const recentTransactions = [
  {
    id: 1,
    description: "Grocery Store",
    amount: -89.5,
    category: "Food & Dining",
    date: "2024-01-15",
    type: "expense",
  },
  {
    id: 2,
    description: "Salary Deposit",
    amount: 3500.0,
    category: "Income",
    date: "2024-01-15",
    type: "income",
  },
  {
    id: 3,
    description: "Gas Station",
    amount: -45.2,
    category: "Transportation",
    date: "2024-01-14",
    type: "expense",
  },
  {
    id: 4,
    description: "Netflix Subscription",
    amount: -15.99,
    category: "Entertainment",
    date: "2024-01-14",
    type: "expense",
  },
  {
    id: 5,
    description: "Freelance Payment",
    amount: 750.0,
    category: "Income",
    date: "2024-01-13",
    type: "income",
  },
];

const TransactionsSummary = () => {
  return (
    <Card>
      <CardHeader
        title={
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography variant="h6">Recent Transactions</Typography>
              <Typography variant="body2" color="text.secondary">
                Your latest financial activity
              </Typography>
            </Box>

            <Box display="flex" gap={1}>
              <Button
                variant="outlined"
                size="small"
                startIcon={<FilterListIcon fontSize="small" />}
              >
                Filter
              </Button>
              <Button
                variant="outlined"
                size="small"
                startIcon={<DownloadIcon fontSize="small" />}
              >
                Export
              </Button>
            </Box>
          </Box>
        }
      />

      <CardContent>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Date</TableCell>
                <TableCell align="right">Amount</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {recentTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>
                    <Box display="flex" alignItems="center" gap={1}>
                      {transaction.type === "expense" ? (
                        <CreditCardIcon
                          fontSize="small"
                          sx={{ color: "error.main" }}
                        />
                      ) : (
                        <ArrowUpwardIcon
                          fontSize="small"
                          sx={{ color: "success.main" }}
                        />
                      )}
                      <Typography variant="body2">
                        {transaction.description}
                      </Typography>
                    </Box>
                  </TableCell>

                  <TableCell>
                    <Chip
                      label={transaction.category}
                      color="default"
                      size="small"
                      variant="outlined"
                    />
                  </TableCell>

                  <TableCell>
                    <Typography variant="body2">{transaction.date}</Typography>
                  </TableCell>

                  <TableCell align="right">
                    <Typography
                      variant="body2"
                      fontWeight="medium"
                      sx={{
                        color:
                          transaction.amount > 0
                            ? "success.main"
                            : "error.main",
                      }}
                    >
                      {transaction.amount > 0 ? "+" : "-"}$
                      {Math.abs(transaction.amount).toLocaleString()}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default TransactionsSummary;
