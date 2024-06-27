import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredUsers: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    FILTER_USERS(state, action) {
      const { users, search } = action.payload;
      const tempUsers = users.filter(
        (user) =>
          user.firstName.toLowerCase().includes(search.toLowerCase()) ||
          user.emailAddress.toLowerCase().includes(search.toLowerCase())
      );
      state.filteredUsers = tempUsers;
    },
  },
});

export const { FILTER_USERS } = filterSlice.actions;

export const selectUsers = (state) => state.filter.filteredUsers;

export default filterSlice.reducer;