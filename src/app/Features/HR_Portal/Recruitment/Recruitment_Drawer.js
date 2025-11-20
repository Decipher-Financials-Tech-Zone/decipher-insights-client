import React, { useState } from 'react';
import { Drawer, Button, List, ListItem, ListItemText, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Recruitment_form from './Recruitment_form';

export default function Recruitment_Drawer() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (state) => () => {
    setOpen(state);
  };

  const drawerList = (
    <List sx={{ width: 750 }}>
        <Recruitment_form/>
    </List>
  );

  return (
    <>
      <Button variant='outlined' onClick={toggleDrawer(true)} sx={{marginRight: "20px"}}>Add Candidate</Button>
      
      <Button variant='outlined' disabled> Edit Candidate details</Button>
      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)} sx={{ mr: 2, position: 'relative', zIndex: 2001 }}>
        {drawerList}
      </Drawer>
    </>
  );
}
