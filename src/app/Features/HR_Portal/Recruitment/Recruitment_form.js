import React, { useState } from 'react';
import {
  Box,
  Grid,
  TextField,
  MenuItem,
  Button,
  Typography,
} from '@mui/material';



const initialState = {
  sno: '',
  date: new Date().toISOString().split('T')[0],
  name: '',
  phone: '',
  location: '',
  qualification: '',
  certification: '',
  experience: '',
  reasonForChange: '',
  currentCTC: '',
  expectedCTC: '',
  noticePeriod: '',
  interviewDate: new Date().toISOString().split('T')[0] ,
  time: '',
  panel: '',
  mode: '',
  telephonic: '',
  technical: '',
  test: '',
  ceo: '',
  status: '',
  source: '',
  refBy: '',
  comments: '',
};

export default function Recruitment_form() {
  const [form, setForm] = useState(initialState);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form); // replace with backend logic
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h6" gutterBottom>
        Candidate Information Form
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {[
            ['date', 'Date', 'date'],
            ['name', 'Name'],
            ['phone', 'Phone Number'],
            ['location', 'Location'],
            ['qualification', 'Qualification / Academics'],
            ['certification', 'Certification'],
            ['experience', 'Experience'],
            ['reasonForChange', 'Reason of Change'],
            ['currentCTC', 'Current CTC'],
            ['expectedCTC', 'Expected CTC'],
            ['noticePeriod', 'Notice Period'],
            ['interviewDate', 'Interview Date', 'date'],
            ['time', 'Time', 'time'],
            ['panel', 'Panel'],
            ['telephonic', 'Telephonic'],
            ['technical', 'Technical'],
            ['test', 'Test'],
            ['ceo', 'CEO'],
            ['source', 'Source'],
            ['refBy', 'Ref By'],
            ['comments', 'Comments'],
          ].map(([name, label, type = 'text']) => (
            <Grid item xs={12} sm={6} key={name}>
              <TextField
                fullWidth
                type={type}
                label={label}
                name={name}
                value={form[name]}
                onChange={handleChange}
              />
            </Grid>
          ))}

          {/* Select fields for MODE and STATUS */}
          <Grid item xs={12} sm={6}>
            <TextField
              select
              fullWidth
              label="Mode"
              name="mode"
              value={form.mode}
              onChange={handleChange}
            >
              {['Online', 'Offline', 'Hybrid'].map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              select
              fullWidth
              label="Status"
              name="status"
              value={form.status}
              onChange={handleChange}
            >
              {['Selected', 'Rejected', 'Pending', 'On Hold'].map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}
