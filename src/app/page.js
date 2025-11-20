"use client";
import { useContext, useEffect } from "react";
import Layout from "./Layout/Layout";
import Login from "./authentication/Login";
import { AuthContext } from "../context/AuthContext";

export default function Home() {
  const { authToken, logout, isLoggingIn, setAuthToken } = useContext(AuthContext);

  useEffect(() => {
    // Retrieve token from sessionStorage on mount
    const token = sessionStorage.getItem("diAuthToken");
    if (token) {
      setAuthToken(token);
    }

    // Function to clear session storage on tab close or refresh
    const clearSessionStorage = () => {
      sessionStorage.clear();
    };

    window.addEventListener("beforeunload", clearSessionStorage);

    return () => {
      window.removeEventListener("beforeunload", clearSessionStorage);
    };
  }, [setAuthToken]);

  return (
    <>
      {authToken ? (
        <Layout handleLogout={logout} loggingOut={isLoggingIn} />
      ) : (
        <Login />
      )}
    </>
  );
}
