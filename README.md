# Phonebook Application

This is a simple phonebook application built with React that allows users to store, manage, and filter contacts. The app provides the following functionality: adding new contacts, filtering contacts by name, and deleting contacts. All data is handled locally and does not persist between page refreshes.

## Features

### 1. Add Contacts
   - Users can add contacts by filling in a form with the contact's name and phone number.
   - The name input supports only letters, apostrophes, dashes, and spaces.
   - The phone number input supports various formats, including numbers with spaces, dashes, parentheses, and an optional "+" for international numbers.

### 2. Display Contacts
   - Contacts are displayed in a list format showing both the name and phone number.
   - The contact list updates dynamically whenever a new contact is added or deleted.
   - Each contact has a unique `id`, generated using the `nanoid` package.

### 3. Filter Contacts
   - A search field allows users to filter the list of contacts by name.
   - The filter function is case-insensitive, meaning it works regardless of capitalization.

### 4. Prevent Duplicate Contacts
   - The application prevents users from adding contacts that already exist in the phonebook. If a user tries to add a duplicate contact, they will receive an alert.

### 5. Delete Contacts
   - Each contact has a delete button that allows users to remove that contact from the list.
   - Once a contact is deleted, the list updates immediately to reflect the changes.

## Application Structure

The app is structured into the following components:

1. **App**: The main component that holds the state for the contacts and the filter. It manages the logic for adding, deleting, and filtering contacts.
2. **ContactForm**: The form component where users can input a contact's name and phone number to add it to the phonebook.
3. **Filter**: A controlled input that allows users to search through the contact list by name.
4. **ContactList**: Renders the list of contacts that match the search filter.
5. **ContactItem**: Represents an individual contact with the name, phone number, and a delete button.

## State Structure

The application maintains its state in the `App` component with the following structure:

```js
state = {
  contacts: [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' }
  ],
  filter: '',
  name: '',
  number: ''
}
