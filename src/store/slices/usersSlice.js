import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers } from "../thunks/fecthUsers";
import { addUser } from "../thunks/addUser";
import { removeUser } from "../thunks/removeUser";

const userSlice = createSlice({
  name: "users",
  initialState: {
    data: [],
    isLoading: false,
    error: null,
  },

  extraReducers(builder) {
    // FETCHING USER
    builder.addCase(fetchUsers.pending, (state, action) => {
      // update state object however appropriate
      // to show the user what we are loading data

      state.isLoading = true;
    }); // we will watch for pending;

    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    }); // we will watch for fullfilled which means request completed succesfull;

    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    }); //  we will watch for error
    // ADDING USER
    builder.addCase(addUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(addUser.fulfilled, (state, action) => {
      state.isLoading = false;
      console.log(action);
      state.data.push(action.payload);
    });
    builder.addCase(addUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });

    // REMOVING USER
    builder.addCase(removeUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(removeUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = state.data.filter((user) => {
        return user.id !== action.payload.id;
      });
      // fix me
      console.log(action);
    });
    builder.addCase(removeUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export const usersReducer = userSlice.reducer;
