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

import { useUserTransactions } from "../../hooks/useTransactions";
import { formatDate } from "../../utils/dateUtility";

const TransactionsSummary = () => {
  const { data, isLoading, error, isError } = useUserTransactions({
    page: 1,
    limit: 15,
  });

  if (isLoading) return <p>Loading user transactions...</p>;
  if (isError) return <p>{error}</p>;

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
              {data.data.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell sx={{ padding: "10px 5px" }}>
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
                        {transaction.title}
                      </Typography>
                    </Box>
                  </TableCell>

                  <TableCell>
                    <Chip
                      label={transaction.category.name}
                      color="default"
                      size="small"
                      variant="filled"
                      sx={{ width: "50%" }}
                    />
                  </TableCell>

                  <TableCell>
                    <Typography variant="body2">
                      {formatDate(transaction.date)}
                    </Typography>
                  </TableCell>

                  <TableCell align="right">
                    <Typography
                      variant="body2"
                      fontWeight="medium"
                      sx={{
                        color:
                          transaction.type === "income"
                            ? "success.main"
                            : transaction.type === "expense"
                            ? "error.main"
                            : "secondary.main",
                      }}
                    >
                      {transaction.type === "expense"
                        ? "-"
                        : transaction.type === "income"
                        ? "+"
                        : "N.A"}
                      ${Math.abs(transaction.amount).toLocaleString()}
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
