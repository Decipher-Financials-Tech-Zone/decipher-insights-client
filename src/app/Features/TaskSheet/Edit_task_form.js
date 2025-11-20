import { useState, useMemo, useContext, useEffect } from "react";
import {
  Avatar,
  Paper,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  TextField,
  MenuItem,
  Button,
  Box,
} from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import { AuthContext } from "@/context/AuthContext";
import edit_todays_task from "@/app/api/edit_todays_task";


const Edit_task_form = () => {
  const { userDetails, setUserDetails } = useContext(AuthContext);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  

  const today = new Date().toISOString().split("T")[0];
  const todaysTask = userDetails.dailyTasks?.find(task => task.date === today) || {};

  const [formData, setFormData] = useState({
    email: userDetails["email"],
    client: todaysTask.client || "",
    project: todaysTask.project || "",
    comments: todaysTask.comments || "",
    tasks: todaysTask.tasks || "",
    name: userDetails["name"],
    submitted: false,
    date: today,
  });

  useEffect(() => {
    setFormData(prevData => ({
      ...prevData,
      client: todaysTask.client || "",
      project: todaysTask.project || "",
      comments: todaysTask.comments || "",
      tasks: todaysTask.tasks || "",
    }));
  }, [userDetails]);

   const options = {
    Blackstone: ["Earnings", "Compsheet", "Adhoc", "Others"],
    Cliffwater: ["Borrower Models", "CDLI", "JIRA", "Equity Models", "Adhoc", "Others"],
    Barings: ["Cash Sheet", "Workiva", "Others", "Adhoc"],
    "26North": ["Models", "Adhoc", "Others"],
    Other: ["Mention in Tasks and Comments"],
    Multiple: ["Mention in Tasks and Comments"],
    Leave: ["Leave"],
    Engineering: ["General Automation", "Software Development","TIKLE", "Decipher Insights"],
    "Human Resource": ["Recruitment", "Simply IT", "Keka", "Smartworks", "DELL", "Internal Mangement", "Multiple", "Other"]
  };

  const availableItems = useMemo(() => options[formData.client] || [], [formData.client]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      if (name === "client" && value === "Leave") {
        return { ...prev, client: value, project: "Leave", tasks: "Leave" };
      } else if (name === "client") {
        return { ...prev, client: value, project: "", tasks: "" };
      }
      return { ...prev, [name]: value };
    });

    setErrors((prev) => ({
      ...prev,
      [name]: value.trim() ? "" : prev[name],
    }));
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.client) newErrors.client = "Client is required";
    if (!formData.project) newErrors.project = "Project is required";
    if (!formData.tasks) newErrors.tasks = "Tasks are required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitting(true);
    try {
      const newData = { ...formData };
      const data = await edit_todays_task(newData);

      const userData = data["userDetails"];
      setUserDetails(userData);
      sessionStorage.setItem("userDetails", JSON.stringify(userData));
      setFormData({ ...newData, submitted: true });
      alert("Your task is updated. Please refresh tasks in the Task History.")
    } catch (error) {
      console.error("Error updating task:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <List sx={{ width: "100%", bgcolor: "background.paper" }}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: deepOrange[500] }}>
                    {userDetails["name"]
                      ? userDetails["name"].split(" ").map((word) => word[0]).slice(0, 2).join("".toUpperCase())
                      : ""}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={userDetails["name"]} secondary={new Date().toLocaleString()} />
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12}>
            <TextField
              select
              label="Client"
              name="client"
              value={formData.client}
              onChange={handleChange}
              fullWidth
              error={!!errors.client}
              helperText={errors.client}
            >
              {Object.keys(options).map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              select
              label="Project"
              name="project"
              value={formData.project}
              onChange={handleChange}
              fullWidth
              disabled={!formData.client || formData.client === "Leave"}
              error={!!errors.project}
              helperText={errors.project}
            >
              {availableItems.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Tasks"
              name="tasks"
              multiline
              rows={4}
              value={formData.tasks}
              onChange={handleChange}
              fullWidth
              error={!!errors.tasks}
              helperText={errors.tasks}
              disabled={formData.client === "Leave"}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Comments"
              name="comments"
              multiline
              rows={4}
              value={formData.comments}
              onChange={handleChange}
              fullWidth
              disabled={formData.client === "Leave"}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth onClick={handleSubmit} disabled={submitting}>
              {submitting ? "Updating..." : "Update Task"}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default Edit_task_form;
