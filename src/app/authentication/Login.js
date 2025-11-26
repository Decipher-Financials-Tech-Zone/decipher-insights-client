"use client";

import { useState, useContext } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Card,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
} from "@mui/material";
import { AuthContext } from "../../context/AuthContext";
import Image from "next/image";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoggingIn, userDetails } = useContext(AuthContext);

  // Forgot Password States
  const [forgotOpen, setForgotOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotMessage, setForgotMessage] = useState(null);
  const [forgotError, setForgotError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailLowerCase = email.toLowerCase();
    login(emailLowerCase, password);
  };

  // Handle forgot password API call
  const handleForgotPassword = async () => {
    setForgotMessage(null);
    setForgotError(null);
    setForgotLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}api/auth/forgot-password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: forgotEmail }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setForgotError(data.error || "Something went wrong.");
      } else {
        setForgotMessage(
          "Temporary password sent to your email. Check your inbox."
        );
      }
    } catch (err) {
      setForgotError("Network error.");
    } finally {
      setForgotLoading(false);
    }
  };

  return (
    <Card>
      <div
        style={{
          height: "100px",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: "50px",
          marginTop: "100px",
        }}
      >
        <Image
          src="/logo.svg"
          alt="Logo"
          style={{ objectFit: "cover" }}
          width={500}
          height={100}
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
            <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
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

              {/* Forgot Password Button */}
              <Typography
                variant="body2"
                sx={{
                  mt: 1,
                  mb: 2,
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
                color="primary"
                onClick={() => setForgotOpen(true)}
              >
                Forgot Password?
              </Typography>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 1 }}
                disabled={isLoggingIn}
              >
                {isLoggingIn ? "Logging in..." : "Login"}
              </Button>
            </Box>
          )}
        </Box>
      </Container>

      {/* Forgot Password Modal */}
      <Dialog open={forgotOpen} onClose={() => setForgotOpen(false)}>
        <DialogTitle>Reset Password</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Enter your registered email. A temporary password will be sent.
          </Typography>

          {forgotMessage && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {forgotMessage}
            </Alert>
          )}

          {forgotError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {forgotError}
            </Alert>
          )}

          <TextField
            autoFocus
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
            value={forgotEmail}
            onChange={(e) => setForgotEmail(e.target.value)}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setForgotOpen(false)}>Close</Button>

          <Button
            onClick={handleForgotPassword}
            disabled={forgotLoading}
            variant="contained"
          >
            {forgotLoading ? "Sending..." : "Send Password"}
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default Login;