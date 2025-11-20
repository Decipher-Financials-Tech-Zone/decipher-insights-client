"use client";

import React, { useState, useContext, useEffect } from "react";
import { TextField, Button, Box, Typography, Paper } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { submitWFHRequest } from "@/app/api/request_form";
import { AuthContext } from "@/context/AuthContext"; // ✅ import context

export default function Request_form() {
  const { userDetails } = useContext(AuthContext); // ✅ Access user details from context

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    startDate: null,
    endDate: null,
    lastNonStandardMonth: null,
    reason: "",
    numWfhDays: "",
  });

  // ✅ Pre-fill user info once context loads
  useEffect(() => {
    if (userDetails) {
      setFormData((prev) => ({
        ...prev,
        name: userDetails["name"] || "",
        email: userDetails["email"] || "",
      }));
    }
  }, [userDetails]);

  const handleChange = (field) => (event) => {
    setFormData((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleDateChange = (field) => (newValue) => {
    setFormData((prev) => ({ ...prev, [field]: newValue }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const submission = {
      ...formData,
      startDate: formData.startDate?.format("YYYY-MM-DD"),
      endDate: formData.endDate?.format("YYYY-MM-DD"),
      lastNonStandardMonth: formData.lastNonStandardMonth?.format("YYYY-MM"),
      numWfhDays: Number(formData.numWfhDays),
      approved: false,
    };

    const res = await submitWFHRequest(submission);
    console.log(res.data)

    if (res.success) {
      // ✅ Trigger email to manager
      await fetch("/api/sendEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...submission,
          id: res.data.data._id, // ✅ Pass MongoDB ID
        }),
      });

      alert("✅ WFH request submitted and email sent to manager!");
    } else {
      alert(`❌ ${res.error}`);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        sx={{
          minHeight: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={0}
          sx={{
            p: 4,
            borderRadius: 3,
            width: "100%",
            maxWidth: "100%",
          }}
        >
          <Typography
            variant="h5"
            sx={{ mb: 3, fontWeight: 600, textAlign: "center" }}
          >
            Non-Standard WFH Request Form
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ display: "flex", flexDirection: "column", gap: 3 }}
          >
            {/* ✅ Name (auto-filled & disabled) */}
            <TextField
              label="Name"
              variant="outlined"
              value={formData.name}
              onChange={handleChange("name")}
              fullWidth
              required
              disabled
            />

            {/* ✅ Email (auto-filled & disabled) */}
            <TextField
              label="Email"
              variant="outlined"
              value={formData.email}
              onChange={handleChange("email")}
              fullWidth
              required
              disabled
            />

            {/* Dates in a row */}
            <Grid container spacing={2}>
              <Grid xs={6}>
                <DatePicker
                  label="Start Date"
                  value={formData.startDate}
                  onChange={handleDateChange("startDate")}
                  slotProps={{ textField: { fullWidth: true, required: true } }}
                />
              </Grid>

              <Grid xs={6}>
                <DatePicker
                  label="End Date"
                  value={formData.endDate}
                  onChange={handleDateChange("endDate")}
                  slotProps={{ textField: { fullWidth: true, required: true } }}
                />
              </Grid>
            </Grid>

            {/* Number of WFH Days */}
            <TextField
              label="Number of WFH Days Required"
              type="number"
              value={formData.numWfhDays}
              onChange={handleChange("numWfhDays")}
              fullWidth
              required
            />

            {/* Last Non-Standard Month */}
            <DatePicker
              label="Last Non-Standard WFH (Month & Year)"
              views={["year", "month"]}
              value={formData.lastNonStandardMonth}
              onChange={handleDateChange("lastNonStandardMonth")}
              slotProps={{
                textField: {
                  fullWidth: true,
                  required: true,
                  helperText: "Select the month and year",
                },
              }}
            />

            {/* Reason */}
            <TextField
              label="Reason"
              multiline
              rows={4}
              value={formData.reason}
              onChange={handleChange("reason")}
              fullWidth
              required
            />

            {/* Submit Button */}
            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{ borderRadius: 2 }}
            >
              Submit Request
            </Button>
          </Box>
        </Paper>
      </Box>
    </LocalizationProvider>
  );
}
