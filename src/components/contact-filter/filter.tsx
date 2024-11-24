import React from "react";
import styles from "../contact-form/form.module.css";

interface FilterProps {
  filter: string;
  onChange: (filter: string) => void;
}

const Filter: React.FC<FilterProps> = ({ filter, onChange }) => {
  return (
    <div className={styles["input-search"]}>
      <input
        className={styles.input}
        type="text"
        value={filter}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search contacts..."
      />
    </div>
  );
};

export default Filter;
