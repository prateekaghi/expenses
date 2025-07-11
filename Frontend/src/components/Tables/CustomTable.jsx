import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  CircularProgress,
  Box,
} from "@mui/material";

const CustomTable = ({
  columns = [],
  data = [],
  total = 0,
  page = 0,
  limit = 10,
  loading = false,
  onPageChange,
  onLimitChange,
  renderActions,
}) => {
  return (
    <Paper
      sx={{
        width: "100%",
        overflowX: "auto",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <TableContainer style={{ maxHeight: "25vh" }}>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell sx={{ background: "#bebbbbff" }} key={col.id}>
                  {col.label}
                </TableCell>
              ))}
              {renderActions && <TableCell>Actions</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={columns.length + 1} align="center">
                  <Box display="flex" justifyContent="center" p={2}>
                    <CircularProgress size={24} />
                  </Box>
                </TableCell>
              </TableRow>
            ) : data.length > 0 ? (
              data.map((row, i) => (
                <TableRow key={row._id || i}>
                  {columns.map((col) => (
                    <TableCell key={col.id}>{row[col.id]}</TableCell>
                  ))}
                  {renderActions && <TableCell>{renderActions(row)}</TableCell>}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length + 1} align="center">
                  No data found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={total}
        page={page}
        rowsPerPage={limit}
        onPageChange={(_, newPage) => onPageChange(newPage)}
        onRowsPerPageChange={(e) => onLimitChange(parseInt(e.target.value))}
        rowsPerPageOptions={[5, 10, 25, 50, 100]}
      />
    </Paper>
  );
};

export default CustomTable;
