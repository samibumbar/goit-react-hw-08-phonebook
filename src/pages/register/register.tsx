import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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

const Register: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordStrength, setPasswordStrength] = useState<string>("");
  const [isPasswordTouched, setIsPasswordTouched] = useState<boolean>(false);

  const navigate = useNavigate();

  const evaluatePasswordStrength = (password: string) => {
    let strength = 0;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z\d]/.test(password)) strength++;
    if (strength < 2) return "Weak";
    if (strength === 2) return "Moderate";
    return "Strong";
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    if (!isPasswordTouched) {
      setIsPasswordTouched(true);
    }
    if (value.length < 8) {
      setPasswordError("Password must be at least 8 characters long.");
      setPasswordStrength("");
    } else if (!/[^a-zA-Z\d]/.test(value)) {
      setPasswordError(
        "Password must contain at least one special character (e.g., @, #, !, etc.)."
      );
      setPasswordStrength("");
    } else {
      setPasswordError(null);
      setPasswordStrength(evaluatePasswordStrength(value));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!name || !email || !password) {
      setError("All fields are required.");
      return;
    }
    if (password.length < 8 || !/[^a-zA-Z\d]/.test(password)) {
      setError("Password must meet all requirements.");
      return;
    }
    try {
      await api.post("/users/signup", { name, email, password });
      alert("Registration successful! You can now log in.");
      navigate("/login");
    } catch (error: any) {
      if (
        error.response?.status === 400 &&
        error.response?.data?.code === 11000
      ) {
        setError("This email is already registered. Please use another email.");
      } else {
        setError("Registration failed! Please try again.");
      }
    }
  };

  const togglePasswordVisibility = (): void => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 400,
        mx: "auto",
        mt: 4,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography variant="h4" textAlign="center">
        Register
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <TextField
        fullWidth
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        autoComplete="name"
      />
      <TextField
        fullWidth
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoComplete="email"
      />
      <TextField
        fullWidth
        label="Password"
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={(e) => handlePasswordChange(e.target.value)}
        onFocus={() => setIsPasswordTouched(true)}
        required
        error={!!passwordError}
        autoComplete="new-password"
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
      {isPasswordTouched &&
        password.length >= 8 &&
        !passwordError &&
        passwordStrength && (
          <FormHelperText>
            <Typography
              color={
                passwordStrength === "Strong"
                  ? "green"
                  : passwordStrength === "Moderate"
                    ? "orange"
                    : "red"
              }
            >
              Password strength: {passwordStrength}
            </Typography>
          </FormHelperText>
        )}
      <Button type="submit" variant="contained" fullWidth>
        Register
      </Button>
    </Box>
  );
};

export default Register;
