import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

interface AuthState {
  token: string | null;
  user: any;
  error: string | null;
}

const initialState: AuthState = {
  token: localStorage.getItem("token") || null,
  user: null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (
      state,
      action: PayloadAction<{ token: string; user: any }>
    ) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.error = null;
      localStorage.setItem("token", action.payload.token);
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem("token");
    },
    loginFailed: (state, action: PayloadAction<{ error: string | null }>) => {
      state.token = null;
      state.user = null;
      state.error = action.payload.error;
    },
  },
});

const persistConfig = {
  key: "auth",
  storage,
  whitelist: ["token"],
};

export const { loginSuccess, logout, loginFailed } = authSlice.actions;
export const authReducer = persistReducer(persistConfig, authSlice.reducer);
