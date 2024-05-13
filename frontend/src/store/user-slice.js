import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    fname: null,
    lname: null,
    email: null,
  },
  reducers: {
    setUser: (state, action) => {
      const { fname, lname, email } = action.payload.data;
      state.fname = fname;
      state.lname = lname;
      state.email = email;
    },
    logoutUser: (state) => {
      state.fname = null;
      state.lname = null;
      state.email = null;
    },
  },
});

export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
