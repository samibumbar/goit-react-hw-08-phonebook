import React, { useState } from "react";
import { contactFormSchema } from "./validation";
import { ValidationError } from "yup";
import styles from "./form.module.css";

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
    <form onSubmit={handleSubmit} className={styles.wrapper}>
      <div className={styles["inputs-container"]}>
        <div>
          <input
            className={styles.input}
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter contact name"
            required
          />
          {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
        </div>

        <div>
          <input
            className={styles.input}
            type="tel"
            name="number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            placeholder="Enter phone number"
            required
          />
          {errors.number && <p style={{ color: "red" }}>{errors.number}</p>}
        </div>
      </div>

      <button className={styles.button} type="submit">
        Add Contact
      </button>
    </form>
  );
};

export default ContactForm;
