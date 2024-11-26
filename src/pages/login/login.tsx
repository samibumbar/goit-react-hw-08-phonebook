import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../redux/authSlice";
import api from "../../api/api";
import {
  Box,
  TextField,
  Button,
  Typography,
  IconButton,
  InputAdornment,
  Alert,
  FormHelperText,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [isPasswordTouched, setIsPasswordTouched] = useState(false);
  const [isEmailTouched, setIsEmailTouched] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (!isEmailTouched) setIsEmailTouched(true);
    if (!value.includes("@")) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError(null);
    }
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    if (!isPasswordTouched) setIsPasswordTouched(true);
    if (value.length < 8) {
      setPasswordError("Password must be at least 8 characters long.");
    } else {
      setPasswordError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill out all fields.");
      return;
    }

    if (emailError || passwordError) {
      setError("Please fix the errors before submitting.");
      return;
    }

    try {
      const response = await api.post("/users/login", { email, password });
      dispatch(login({ token: response.data.token, email }));
      navigate("/contacts");
    } catch (err) {
      setError("Login failed! Please check your email or password.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ maxWidth: 400, mx: "auto", mt: 4 }}
    >
      <Typography variant="h4" textAlign="center" mb={2}>
        Login
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <TextField
        fullWidth
        label="Email"
        type="email"
        value={email}
        onChange={(e) => handleEmailChange(e.target.value)}
        onFocus={() => setIsEmailTouched(true)}
        sx={{ mb: 1 }}
        autoComplete="email"
        error={!!emailError}
      />
      {isEmailTouched && emailError && (
        <FormHelperText error>{emailError}</FormHelperText>
      )}
      <TextField
        fullWidth
        label="Password"
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={(e) => handlePasswordChange(e.target.value)}
        onFocus={() => setIsPasswordTouched(true)}
        sx={{ mb: 1 }}
        autoComplete="current-password"
        error={!!passwordError}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={togglePasswordVisibility}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      {isPasswordTouched && passwordError && (
        <FormHelperText error>{passwordError}</FormHelperText>
      )}
      <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
        Login
      </Button>
    </Box>
  );
};

export default Login;
