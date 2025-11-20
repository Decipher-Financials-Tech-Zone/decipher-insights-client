import React, { useContext, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import dayjs from "dayjs";
import { Card } from "@mui/material";
import Grid from "@mui/material/Grid2";
import fetchAdminTasks from "@/app/api/fetchAdminTasks";
import fetchTaskLastMonth from "@/app/api/fetchTaskLastMonth";
import fetchTasksAllTime from "@/app/api/fetchTasksAllTime";
import { AuthContext } from "@/context/AuthContext";
import downloadExcel from "@/app/excel_functions.js/array_to_excel";

const All_Tasks_Selector = ({ setAdminTasksList, adminTasksList }) => {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [loading, setLoading] = useState(false);

  const { setAndFixAdminTask } = useContext(AuthContext);

  // Reusable function for fetching and setting tasks
  const fetchAndSetTasks = async (fetchFunction) => {
    try {
      setLoading(true);
      const tasks = await fetchFunction();
      const processedTasks = setAndFixAdminTask(tasks);
      setAdminTasksList(processedTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card sx={{ padding: "1rem" }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Grid container spacing={2} alignItems="center">
          {/* Date Picker */}
          <Grid item xs={4}>
            <DatePicker
              label="Select Date"
              value={selectedDate}
              onChange={(newDate) => setSelectedDate(newDate)}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </Grid>

          {/* Submit Button */}
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={() => fetchAndSetTasks(() => fetchAdminTasks(selectedDate.format("YYYY-MM-DD")))}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "View"}
            </Button>
          </Grid>

          {/* Fetch Last Month */}
          <Grid item>
            <Button
              variant="outlined"
              onClick={() => fetchAndSetTasks(fetchTaskLastMonth)}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "View Last Month"}
            </Button>
          </Grid>

          {/* Fetch All Time */}
          <Grid item>
            <Button
              variant="outlined"
              onClick={() => fetchAndSetTasks(fetchTasksAllTime)}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "View All Time"}
            </Button>
          </Grid>
          <Grid item>
            <Button color="success" variant="contained" onClick={() => downloadExcel(adminTasksList)}>Download Excel</Button>
          </Grid>
        </Grid>
      </LocalizationProvider>
    </Card>
  );
};

export default All_Tasks_Selector;
