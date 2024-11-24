import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "./store";
import {
  fetchContacts,
  addContact,
  deleteContact,
  setFilter,
} from "./contactsSlice";
import { ContactForm, Filter, ContactList } from "./components";
import styles from "./app.module.css";

const App: React.FC = () => {
  const {
    items: contacts,
    isLoading,
    error,
    filter,
  } = useSelector((state: RootState) => state.contacts);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleAddContact = (name: string, number: string) => {
    if (contacts.some((contact) => contact.name === name)) {
      alert(`${name} is already in contacts.`);
      return;
    }
    dispatch(addContact({ name, number }));
  };

  const handleDeleteContact = (id: string) => {
    dispatch(deleteContact(id));
  };

  const handleFilterChange = (filter: string) => {
    dispatch(setFilter(filter));
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>Phonebook</h1>
      <ContactForm onSubmit={handleAddContact} />
      <h2 className={styles.h2}>Contacts</h2>
      <Filter filter={filter} onChange={handleFilterChange} />
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ContactList
          contacts={filteredContacts}
          onDelete={handleDeleteContact}
        />
      )}
    </div>
  );
};

export default App;
