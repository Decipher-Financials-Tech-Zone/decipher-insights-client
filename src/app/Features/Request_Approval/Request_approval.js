"use client";

import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import { approveRejectRequest } from "@/app/api/handleApprove";

export default function Request_approval() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(null); // ✅ loader for specific row action
  const base_url = process.env.NEXT_PUBLIC_BASE_URL

  // ✅ Fetch all WFH requests on mount
  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${base_url}api/wfh/all`);
        const data = await res.json();

        if (data.success) {
          setRequests(data.data);
        } else {
          console.error("❌ Error fetching requests:", data.error);
        }
      } catch (error) {
        console.error("❌ Error fetching WFH requests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  // ✅ Handle Approve or Reject action
  const handleApproveRequest = async (requestId, decision) => {
    try {
      setActionLoading(requestId);

      const response = await approveRejectRequest(requestId, decision);

      if (response.success) {
        alert(`✅ Request ${decision ? "approved" : "rejected"} successfully.`);

        // ✅ Instantly update UI
        setRequests((prev) =>
          prev.map((req) =>
            req._id === requestId ? { ...req, approved: decision } : req
          )
        );
      } else {
        alert(`❌ ${response.error}`);
      }
    } catch (error) {
      console.error("❌ Error handling approval:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setActionLoading(null);
    }
  };

  // ✅ Show loader while fetching all requests
  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "80vh",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "flex-start",
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: 4,
          borderRadius: 3,
          width: "100%",
        }}
      >
        <Typography
          variant="h5"
          sx={{ mb: 3, fontWeight: 600, textAlign: "center" }}
        >
          WFH Requests Pending Approval
        </Typography>

        <TableContainer component={Paper} elevation={0}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                <TableCell><b>Name</b></TableCell>
                <TableCell><b>Start Date</b></TableCell>
                <TableCell><b>End Date</b></TableCell>
                <TableCell><b>Days</b></TableCell>
                <TableCell><b>Reason</b></TableCell>
                <TableCell><b>Last Non-Standard Month</b></TableCell>
                <TableCell><b>Status</b></TableCell>
                <TableCell align="center"><b>Action</b></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {requests.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} align="center">
                    <Typography color="text.secondary">
                      No WFH requests found.
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                requests.map((req) => (
                  <TableRow key={req._id}>
                    <TableCell>{req.name}</TableCell>
                    <TableCell>{req.startDate}</TableCell>
                    <TableCell>{req.endDate}</TableCell>
                    <TableCell>{req.numWfhDays}</TableCell>
                    <TableCell>{req.reason}</TableCell>
                    <TableCell>{req.lastNonStandardMonth}</TableCell>

                    <TableCell>
                      {req.approved === null || req.approved === undefined ? (
                        <Typography color="warning.main">Pending</Typography>
                      ) : req.approved ? (
                        <Typography color="success.main">Approved</Typography>
                      ) : (
                        <Typography color="error.main">Rejected</Typography>
                      )}
                    </TableCell>

                    <TableCell align="center">
                      {req.approved === null || req.approved === undefined ? (
                        <>
                          <Button
                            variant="contained"
                            size="small"
                            disabled={actionLoading === req._id}
                            sx={{ mr: 1, borderRadius: 2 }}
                            onClick={() => handleApproveRequest(req._id, true)}
                          >
                            {actionLoading === req._id ? "..." : "Approve"}
                          </Button>

                          <Button
                            variant="outlined"
                            color="error"
                            size="small"
                            disabled={actionLoading === req._id}
                            sx={{ borderRadius: 2 }}
                            onClick={() =>
                              handleApproveRequest(req._id, false)
                            }
                          >
                            {actionLoading === req._id ? "..." : "Reject"}
                          </Button>
                        </>
                      ) : (
                        <Typography variant="body2" color="text.secondary">
                          No Action
                        </Typography>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
