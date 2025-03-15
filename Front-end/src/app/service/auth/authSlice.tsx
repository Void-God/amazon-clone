import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    token: null,
    email: "",
    phoneNumber: ""
  },
  isAuthenticated: false,
  forgotPassword: {
    email: null,
    token: null
  }
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    forgotPassword: (state, action) => {
      state.forgotPassword.email = action.payload;
    },
    forgotPasswordToken: (state, action) => {
      state.forgotPassword.token = action.payload;
    }
  },
});

export const { login, forgotPassword, forgotPasswordToken } = authSlice.actions;
export default authSlice.reducer;
