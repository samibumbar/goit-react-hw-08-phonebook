import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "../api/api";

interface AuthState {
  token: string | null;
  email: string | null;
  error: string | null;
}

const initialState: AuthState = {
  token: localStorage.getItem("token"),
  email: localStorage.getItem("email"),
  error: null,
};

export const fetchCurrentUser = createAsyncThunk(
  "auth/fetchCurrentUser",
  async (_, { getState, rejectWithValue }) => {
    const state = getState() as { auth: AuthState };
    const token = state.auth.token;

    if (!token) {
      return rejectWithValue("No token found");
    }

    try {
      const response = await api.get("/users/current", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch user"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ token: string; email: string }>) {
      state.token = action.payload.token;
      state.email = action.payload.email;
      state.error = null;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("email", action.payload.email);
    },
    logout(state) {
      state.token = null;
      state.email = null;
      state.error = null;
      localStorage.removeItem("token");
      localStorage.removeItem("email");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchCurrentUser.fulfilled,
      (state, action: PayloadAction<{ email: string }>) => {
        state.email = action.payload.email;
        state.error = null;
      }
    );
    builder.addCase(fetchCurrentUser.rejected, (state, action) => {
      state.token = null;
      state.email = null;
      state.error = action.payload as string;
      localStorage.removeItem("token");
    });
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
