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
import { AuthContext } from "@/context/AuthContext";
import downloadExcel from "@/app/excel_functions.js/array_to_excel";
import task_not_filled_daily from "@/app/api/task_not_filled_daily";
import task_not_filled_weekly from "@/app/api/task_not_filled_weekly";

const Tasks_Not_Filled_selector = ({
  setTaskNotFilledList,
  taskNotFilledList,
}) => {
  // const [selectedDate, setSelectedDate] = useState(dayjs());
  const [loading, setLoading] = useState(false);

  const {setSelectedDate, selectedDate} = useContext(AuthContext)

  const multiple_dates_missed = async () => {
    try {
      setLoading(true);
      console.log("Multiple Dates Missed");
      const data = await task_not_filled_weekly();
      setTaskNotFilledList(data);
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false);
    }
  };

  const fetchAndSetTasks = async (taskNotFilled) => {
    try {
      setLoading(true);
      const tasks = await taskNotFilled();
      setTaskNotFilledList(tasks);
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
              onClick={() =>
                fetchAndSetTasks(() =>
                  task_not_filled_daily(selectedDate.format("YYYY-MM-DD"))
                )
              }
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "View"
              )}
            </Button>
          </Grid>

          {/* Fetch Last Month */}
          <Grid item>
            <Button
              variant="outlined"
              onClick={multiple_dates_missed}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "View Last Week"
              )}
            </Button>
          </Grid>

          {/* Fetch All Time */}
          {/* <Grid item>
            <Button
              variant="outlined"
              onClick={() => fetchAndSetTasks(fetchTasksAllTime)}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "Fetch All Time"}
            </Button>
          </Grid> */}
          <Grid item>
            <Button
              color="success"
              variant="contained"
              onClick={() => downloadExcel(taskNotFilledList)}
            >
              Download Excel
            </Button>
          </Grid>
        </Grid>
      </LocalizationProvider>
    </Card>
  );
};

export default Tasks_Not_Filled_selector;
