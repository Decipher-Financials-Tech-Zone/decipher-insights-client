"use client";
import React, { useState, useEffect, useContext } from "react";
import TaskSheetForm from "./TaskSheetForm";
import { AuthContext } from "@/context/AuthContext";
import Edit_task from "./Edit_task";

const TaskSheet = () => {
  const [taskSubmitted, setTaskSubmitted] = useState(false);
  const [isTimeAllowed, setIsTimeAllowed] = useState(false);
  const [message, setMessage] = useState("");
  const [taskDoneToday, setTaskDoneToday] = useState(false);
  const { userDetails } = useContext(AuthContext);


  useEffect(() => {
    const checkTime = () => {
      const now = new Date();

      // Convert local time to GMT+5:30
      const localTime =
        now.getTime() + now.getTimezoneOffset() * 60000 + 5.5 * 3600000;
      const convertedTime = new Date(localTime);
      const hours = convertedTime.getHours();

      if (hours < 8) {
        setIsTimeAllowed(false);
        setMessage("Task submission will open at 10:00 AM");
      } else if (hours >= 22) {
        setIsTimeAllowed(false);
        setMessage("Task submission is closed after 8:00 PM");
      } else {
        setIsTimeAllowed(true);
      }
    };

    checkTime();
    const interval = setInterval(checkTime, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      { userDetails["taskAvailable"]? <Edit_task/>: isTimeAllowed ? (
        <TaskSheetForm />
      ) : (
        <p>{message}</p>
      )}
    </div>
  );
};

export default TaskSheet;
