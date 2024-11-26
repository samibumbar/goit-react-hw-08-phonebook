import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "../api/api";

interface Contact {
  id: string;
  name: string;
  number: string;
}

interface ContactsState {
  items: Contact[];
  isLoading: boolean;
  error: string | null;
}

const initialState: ContactsState = {
  items: [],
  isLoading: false,
  error: null,
};

export const fetchContacts = createAsyncThunk("contacts/fetchAll", async () => {
  const response = await api.get("/contacts");
  return response.data;
});

export const addContact = createAsyncThunk(
  "contacts/add",
  async (contact: Omit<Contact, "id">) => {
    const response = await api.post("/contacts", contact);
    return response.data;
  }
);

export const deleteContact = createAsyncThunk(
  "contacts/delete",
  async (id: string) => {
    await api.delete(`/contacts/${id}`);
    return id;
  }
);

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {},
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

export default contactsSlice.reducer;
