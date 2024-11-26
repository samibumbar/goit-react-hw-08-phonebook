import React from "react";
import { TextField, Box } from "@mui/material";

interface FilterProps {
  filter: string;
  onChange: (filter: string) => void;
}

const Filter: React.FC<FilterProps> = ({ filter, onChange }) => {
  return (
    <Box sx={{ mb: 2 }}>
      <TextField
        label="Search Contacts"
        value={filter}
        onChange={(e) => onChange(e.target.value)}
        fullWidth
      />
    </Box>
  );
};

export default Filter;
