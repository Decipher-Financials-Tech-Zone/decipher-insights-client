"use client";

import React, { useContext, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import { AuthContext } from "@/context/AuthContext";
import { appendDailyTasks } from "@/app/api/set_leaves";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function TaskSheetAdmin_notFilled({ taskNotFilledList }) {
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const keyName = taskNotFilledList?.[0]?.missingDates
    ? "missingDates"
    : "status";
  const { selectedDate } = useContext(AuthContext);

  const [filters, setFilters] = useState({
    name: "",
    email: "",
    [keyName]: "",
  });

  const [selectedRows, setSelectedRows] = useState([]);

  const handleFilterChange = (event, field) => {
    setFilters({ ...filters, [field]: event.target.value });
  };

  const handleCheckboxChange = (index) => {
    if (selectedRows.includes(index)) {
      setSelectedRows(selectedRows.filter((i) => i !== index));
    } else {
      setSelectedRows([...selectedRows, index]);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);

    const formattedDate = selectedDate.format("YYYY-MM-DD");

    const selectedData = filteredData
      .filter((_, index) => selectedRows.includes(index))
      .map(({ status, email, ...item }) => ({
        ...item,
        date: formattedDate, // append formatted date
        client: "NA",
        project: "NA",
        comments: "NA",
        tasks: "Leave",
      }));

    await appendDailyTasks(selectedData);
    setLoading(false);
    setSelectedRows([]);
    setSnackbarOpen(true);
  };

  const filteredData = taskNotFilledList
    ? taskNotFilledList.filter((task) =>
        Object.keys(filters).every((key) =>
          (task[key] || "").toLowerCase().includes(filters[key].toLowerCase())
        )
      )
    : [];

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{ maxHeight: 400, overflow: "auto" }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="task table" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell></TableCell> {/* Checkbox column header */}
              <TableCell>
                <TextField
                  label="Name"
                  variant="outlined"
                  size="small"
                  value={filters.name}
                  onChange={(e) => handleFilterChange(e, "name")}
                />
              </TableCell>
              <TableCell>
                <TextField
                  label="Email"
                  variant="outlined"
                  size="small"
                  value={filters.email}
                  onChange={(e) => handleFilterChange(e, "email")}
                />
              </TableCell>
              <TableCell>
                <TextField
                  label={keyName === "status" ? "Status" : "Missing Dates"}
                  variant="outlined"
                  size="small"
                  value={filters[keyName]}
                  onChange={(e) => handleFilterChange(e, keyName)}
                />
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredData?.length > 0 ? (
              filteredData.map((values, index) => (
                <TableRow key={index}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedRows.includes(index)}
                      onChange={() => handleCheckboxChange(index)}
                    />
                  </TableCell>
                  <TableCell>{values.name}</TableCell>
                  <TableCell>{values.email}</TableCell>

                  {values.missingDates ? (
                    <TableCell>
                      {values.missingDates.map((date, i) => (
                        <span key={i} style={{ marginRight: "5px" }}>
                          {date} <b style={{ color: "red" }}>|</b>
                        </span>
                      ))}
                    </TableCell>
                  ) : (
                    <TableCell>
                      <Chip
                        label={values.status}
                        color={
                          values.status?.trim().toLowerCase() === "pending"
                            ? "warning"
                            : values.status?.trim().toLowerCase() === "leave"
                              ? "error"
                              : "success"
                        }
                      />
                    </TableCell>
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No matching tasks found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Submit Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        sx={{ marginTop: 2 }}
      >
        Mark Leave for Selected
      </Button>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Leaves have been marked successfully! Please fetch the latest status from above.
        </Alert>
      </Snackbar>
    </>
  );
}
