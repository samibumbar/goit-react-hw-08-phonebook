import React from "react";
import ContactItem from "../contact-item/item";
import styles from "./list.module.css";
interface ContactListProps {
  contacts: { id: string; name: string; number: string }[];
  onDelete: (id: string) => void;
}

const ContactList: React.FC<ContactListProps> = ({ contacts, onDelete }) => {
  return (
    <ul className={styles["lists-container"]}>
      {contacts.map((contact) => (
        <ContactItem key={contact.id} contact={contact} onDelete={onDelete} />
      ))}
    </ul>
  );
};

export default ContactList;
