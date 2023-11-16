// reducers/authReducer.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  user: null,
  register: null, // Adicione um valor inicial para a chave 'register' para evitar erros
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    logoutSuccess: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    setRegister: (state, action) => {
      state.register = action.payload;
    },
  },
});

export const { loginSuccess, logoutSuccess, setRegister } = authSlice.actions;
export default authSlice.reducer;
