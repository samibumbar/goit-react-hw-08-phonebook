import React from "react";
import styles from "./item.module.css";

interface ContactItemProps {
  contact: { id: string; name: string; number: string };
  onDelete: (id: string) => void;
}

const ContactItem: React.FC<ContactItemProps> = ({ contact, onDelete }) => {
  return (
    <li>
      {contact.name}: {contact.number}
      <button
        onClick={() => onDelete(contact.id)}
        className={styles["delete-button"]}
      >
        Delete
      </button>
    </li>
  );
};

export default ContactItem;
