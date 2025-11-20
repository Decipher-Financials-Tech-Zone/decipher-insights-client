"use client";

import React, { useContext } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import LogoutIcon from "@mui/icons-material/Logout";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";
import { AuthContext } from "../../context/AuthContext";
import LockResetIcon from "@mui/icons-material/LockReset";
import Reset_password_form from "../Features/Reset_Password/Reset_password_form";

export default function UserDetails() {
  const { userDetails, logout, isLoggingIn, isLoggingOut } =
    useContext(AuthContext);

  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      {/* User Info */}
      <ListItem sx={{ cursor: "pointer" }}>
        <ListItemAvatar>
          <Avatar>
            <ImageIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={userDetails?.name || "Guest"}
          secondary={userDetails?.designation || "No designation"}
        />
      </ListItem>
      <Reset_password_form />

      {/* Logout Button */}
      <ListItem sx={{ cursor: "pointer" }} onClick={logout}>
        {isLoggingOut ? (
          <Box sx={{ padding: "auto" }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <ListItemAvatar>
              <Avatar>
                <LogoutIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Logout" />
          </>
        )}
      </ListItem>
    </List>
  );
}
