import React from "react";
import { ListItem, ListItemText, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface ContactItemProps {
  contact: { id: string; name: string; number: string };
  onDelete: (id: string) => void;
}

const ContactItem: React.FC<ContactItemProps> = ({ contact, onDelete }) => {
  return (
    <ListItem
      secondaryAction={
        <IconButton edge="end" onClick={() => onDelete(contact.id)}>
          <DeleteIcon />
        </IconButton>
      }
    >
      <ListItemText primary={contact.name} secondary={contact.number} />
    </ListItem>
  );
};

export default ContactItem;
