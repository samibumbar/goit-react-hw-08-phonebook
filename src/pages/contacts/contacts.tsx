import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchContacts,
  deleteContact,
  addContact,
} from "../../redux/contactsSlice";
import { AppDispatch, RootState } from "../../redux/store";
import ContactList from "../../components/contact-list/list";
import ContactForm from "../../components/contact-form/form";
import Filter from "../../components/contact-filter/filter";
// import UserMenu from "../../components/user-menu/user-menu";
import { Container, Typography } from "@mui/material";

interface Contact {
  id: string;
  name: string;
  number: string;
}

const Contacts: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, isLoading, error } = useSelector(
    (state: RootState) => state.contacts
  );
  // const { email } = useSelector((state: RootState) => state.auth);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleDelete = (id: string) => {
    dispatch(deleteContact(id));
  };

  const handleAddContact = (name: string, number: string) => {
    dispatch(addContact({ name, number }));
  };

  const filteredContacts = items.filter((contact: Contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Container>
      <Typography variant="h4" sx={{ my: 2 }}></Typography>
      <ContactForm onSubmit={handleAddContact} />
      <Filter filter={filter} onChange={setFilter} />
      {isLoading ? (
        <Typography>Loading...</Typography>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <ContactList contacts={filteredContacts} onDelete={handleDelete} />
      )}
    </Container>
  );
};

export default Contacts;
