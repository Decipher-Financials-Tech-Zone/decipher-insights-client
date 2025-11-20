import * as React from 'react';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import Edit_task_form from './Edit_task_form';

export default function Edit_task() {
  return (
    <>
    <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
      Your task for the day is submitted. 
      You cannot submit any more tasks, but you can still edit it.
    </Alert>
    <Edit_task_form/>
    </>
  );
}
