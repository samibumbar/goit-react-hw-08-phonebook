import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://6739e4ffa3a36b5a62efeb72.mockapi.io/contacts";

interface Contact {
  id: string;
  name: string;
  number: string;
}

interface ContactsState {
  items: Contact[];
  isLoading: boolean;
  error: string | null;
  filter: string;
}

const initialState: ContactsState = {
  items: [],
  isLoading: false,
  error: null,
  filter: "",
};

export const fetchContacts = createAsyncThunk("contacts/fetchAll", async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
});

export const addContact = createAsyncThunk(
  "contacts/addContact",
  async (newContact: Omit<Contact, "id">) => {
    const response = await axios.post(BASE_URL, newContact);
    return response.data;
  }
);

export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (id: string) => {
    await axios.delete(`${BASE_URL}/${id}`);
    return id;
  }
);

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<string>) => {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchContacts.fulfilled,
        (state, action: PayloadAction<Contact[]>) => {
          state.isLoading = false;
          state.items = action.payload;
        }
      )
      .addCase(fetchContacts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch contacts";
      })
      .addCase(
        addContact.fulfilled,
        (state, action: PayloadAction<Contact>) => {
          state.items.push(action.payload);
        }
      )
      .addCase(
        deleteContact.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.items = state.items.filter(
            (contact) => contact.id !== action.payload
          );
        }
      );
  },
});

export const { setFilter } = contactsSlice.actions;
export default contactsSlice.reducer;
