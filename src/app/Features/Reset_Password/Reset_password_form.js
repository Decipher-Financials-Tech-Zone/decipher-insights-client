import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import { blue } from "@mui/material/colors";
import LockResetIcon from "@mui/icons-material/LockReset";
import { TextField, Container, Typography } from "@mui/material";
import { useState } from "react";
import resetPassword from "@/app/api/reset_password";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

const emails = ["username@gmail.com", "user02@gmail.com"];

function SimpleDialog(props) {

  const {userDetails, logout}= useContext(AuthContext)
    
  const [inputValue, setInputValue] = useState("");
  const [resetLoading, setResetLoading] = useState(false)
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    setResetLoading(true)
    const output = await resetPassword(userDetails["email"], inputValue)
    setResetLoading(false)
    alert("Password Reset Successful, You will be logged out!")
    setTimeout(()=>logout(), 1000)
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Reset Password</DialogTitle>
      <Container
        maxWidth="sm"
        style={{ margin: "0px 0px 20px 0px", textAlign: "center" }}
      >
        <form onSubmit={handleSubmit}>
          <TextField
            label="Enter new password"
            variant="outlined"
            fullWidth
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary" fullWidth loading={resetLoading}>
            Submit
          </Button>
        </form>
      </Container>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default function Reset_password_form() {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <div>
      <ListItem sx={{ cursor: "pointer" }} onClick={handleClickOpen}>
        <ListItemAvatar>
          <Avatar>
            <LockResetIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Reset Password"></ListItemText>
      </ListItem>
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
    </div>
  );
}
