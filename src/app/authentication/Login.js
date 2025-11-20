"use client";

import { useState, useContext } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Card,
} from "@mui/material";
import { AuthContext } from "../../context/AuthContext";
import Image from "next/image";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoggingIn, userDetails } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailLowerCase = email.toLowerCase();
    login(emailLowerCase, password);
  };

  return (
    <Card>
      <div style={{height: "100px",width: "100%", display: "flex", alignItems: "center", justifyContent: "center", paddingTop: "50px", marginTop: "100px"}}>
      <Image src="/logo.svg" alt="Logo" style={{ objectFit: "cover" }} width={500} height={100}
/>
      </div>
      <Container maxWidth="xs">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mt: 8,
          }}
        >
          {!userDetails && (
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ width: "100%" }}
            >
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                fullWidth
                label="Password"
                type="password"
                variant="outlined"
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
                disabled={isLoggingIn}
              >
                {isLoggingIn ? "Logging in..." : "Login"}
              </Button>
            </Box>
          )}
        </Box>
      </Container>
    </Card>
  );
};

export default Login;
