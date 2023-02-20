import { createSlice } from "@reduxjs/toolkit";

import { fetchUsers } from "../thunks/fecthUsers";

const userSlice = createSlice({
  name: "users",
  initialState: {
    data: [],
    isLoading: false,
    error: null,
  },

  extraReducers(builder) {
    builder.addCase(fetchUsers.pending, (state, action) => {
      // update state object however appropriate
      // to show the user what we are loading data

      state.isLoading = true;
    }); // we will watch for pendin;

    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    }); // we will watch for fullfilled which means request completed succesfull;

    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    }); //  we will watch for erro
  },
});

export const usersReducer = userSlice.reducer;
