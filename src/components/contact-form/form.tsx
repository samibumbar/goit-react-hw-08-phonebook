import React, { useState } from "react";
import { contactFormSchema } from "./validation";
import { ValidationError } from "yup";
import { Box, TextField, Button, Typography } from "@mui/material";

interface ContactFormProps {
  onSubmit: (name: string, number: string) => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [errors, setErrors] = useState<{ name?: string; number?: string }>({});

  const validateForm = async () => {
    try {
      await contactFormSchema.validate({ name, number }, { abortEarly: false });
      setErrors({});
      return true;
    } catch (err) {
      if (err instanceof ValidationError) {
        const validationErrors: { [key: string]: string } = {};
        err.inner.forEach((error) => {
          if (error.path) {
            validationErrors[error.path] = error.message;
          }
        });
        setErrors(validationErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid = await validateForm();
    if (!isValid) return;

    onSubmit(name, number);
    setName("");
    setNumber("");
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >
      <Typography variant="h5" textAlign="center">
        Add Contact
      </Typography>
      <TextField
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={!!errors.name}
        helperText={errors.name}
        fullWidth
      />
      <TextField
        label="Phone Number"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
        error={!!errors.number}
        helperText={errors.number}
        fullWidth
      />
      <Button type="submit" variant="contained" fullWidth>
        Add Contact
      </Button>
    </Box>
  );
};

export default ContactForm;
