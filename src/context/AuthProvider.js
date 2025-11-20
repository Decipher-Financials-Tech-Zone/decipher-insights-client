"use client"; // Required for Next.js App Router

import { useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext"; // Correct path
import { user_login } from "../app/api/user_login"; // Ensure correct path
import dayjs from "dayjs"

const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [userTasks, setUserTasks] = useState()
  const [selectedDate, setSelectedDate] = useState(dayjs)


  // Login function
  const login = async (email, password) => {
    setIsLoggingIn(true);
    try {
      const { authToken, userDetails } = await user_login(email, password);
      if (authToken) {
        sessionStorage.setItem("diAuthToken", authToken);
        sessionStorage.setItem("userDetails", JSON.stringify(userDetails));
        setAuthToken(authToken);
        setUserDetails(userDetails);
      }
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Logout function
  const logout = () => {
    setIsLoggingOut(true)
    // localStorage.removeItem("diAuthToken");
    // localStorage.removeItem("userDetails");
    setTimeout(() => {

      setAuthToken(null);
      setUserDetails(null);
      setIsLoggingOut(false)

    }, 1000)
  };

  const setAndFixAdminTask = (tasks_Array) => {


    const mappedArray = []

    tasks_Array.map((item) => {
      const name = item["name"]

      item["tasks"].map((item)=>{
        mappedArray.push({
          name: name,
          date: item["date"],
          client: item["client"],
          project: item["project"],
          tasks: item["tasks"],
          comments: item["comments"]
        })

      })
    })

    return mappedArray
  }



  // Load user session from localStorage
  useEffect(() => {
    const storedToken = sessionStorage.getItem("diAuthToken");
    const storedUser = sessionStorage.getItem("userDetails");
    if (storedToken && storedUser) {
      setAuthToken(storedToken);
      setUserDetails(JSON.parse(storedUser));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ authToken, userDetails, login, logout, isLoggingIn, setAuthToken, isLoggingOut, setAndFixAdminTask, userTasks, setUserTasks, setUserDetails, setSelectedDate, selectedDate}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
