import {
  Avatar,
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import LockIcon from "@mui/icons-material/Lock";
import { Buffer } from "buffer";
import { USERNAME } from "../apis/auth";

const AuthLayout = ({ children }) => {
  const [authed, setAuthed] = useState(!!localStorage.getItem("password"));
  return authed ? (
    children
  ) : (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            localStorage.setItem(
              "password",
              Buffer.from(`${USERNAME}:${e.target.password.value}`).toString(
                "base64"
              )
            );
            setAuthed(true);
          }}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default AuthLayout;
