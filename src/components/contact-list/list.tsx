import React from "react";
import { List } from "@mui/material";
import ContactItem from "../contact-item/item";

interface ContactListProps {
  contacts: { id: string; name: string; number: string }[];
  onDelete: (id: string) => void;
}

const ContactList: React.FC<ContactListProps> = ({ contacts, onDelete }) => {
  return (
    <List>
      {contacts.map((contact) => (
        <ContactItem key={contact.id} contact={contact} onDelete={onDelete} />
      ))}
    </List>
  );
};

export default ContactList;
