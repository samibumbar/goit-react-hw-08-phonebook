import { createSelector } from "reselect";
import { RootState } from "./store";

const selectEmail = (state: RootState) => state.auth.email;
const selectToken = (state: RootState) => state.auth.token;

export const selectAuthData = createSelector(
  [selectEmail, selectToken],
  (email, token) => ({ email, token })
);
