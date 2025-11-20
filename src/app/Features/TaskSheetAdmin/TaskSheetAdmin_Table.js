"use client";

import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";

export default function TaskSheetAdmin_Table({ tasksTableData }) {
  const [filters, setFilters] = useState({ name: "", date: "", client: "", project: "" });

  const handleFilterChange = (event, field) => {
    setFilters({ ...filters, [field]: event.target.value });
  };

  const filteredData = tasksTableData ? tasksTableData.filter((task) =>
    Object.keys(filters).every((key) =>
      task[key].toLowerCase().includes(filters[key].toLowerCase())
    )
  ) : [];

  return (
    <TableContainer component={Paper} sx={{ maxHeight: 400, overflow: "auto" }}>
      <Table sx={{ minWidth: 650 }} aria-label="task table" stickyHeader>
        <TableHead stick>
          <TableRow>
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
                label="Date"
                variant="outlined"
                size="small"
                value={filters.date}
                onChange={(e) => handleFilterChange(e, "date")}
              />
            </TableCell>
            <TableCell>
              <TextField
                label="Client"
                variant="outlined"
                size="small"
                value={filters.client}
                onChange={(e) => handleFilterChange(e, "client")}
              />
            </TableCell>
            <TableCell>
              <TextField
                label="Project"
                variant="outlined"
                size="small"
                value={filters.project}
                onChange={(e) => handleFilterChange(e, "project")}
              />
            </TableCell>
            <TableCell>Tasks</TableCell>
            <TableCell>Comments</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {filteredData.length > 0 ? (
            filteredData.map((values, index) => (
              <TableRow key={index}>
                <TableCell>{values.name}</TableCell>
                <TableCell>{values.date}</TableCell>
                <TableCell>{values.client}</TableCell>
                <TableCell>{values.project}</TableCell>
                <TableCell>{values.tasks}</TableCell>
                <TableCell>{values.comments}</TableCell>
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
  );
}
