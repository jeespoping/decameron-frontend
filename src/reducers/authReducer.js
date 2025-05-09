import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  loading: false,
  user: null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    loginFailure: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.error = null;
      state.isAuthenticated = false;
      localStorage.clear();
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } =
  authSlice.actions;
export default authSlice.reducer;
