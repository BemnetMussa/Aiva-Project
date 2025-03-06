import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

interface AuthState {
  token: string | null;
  user: any;
  error: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  token: localStorage.getItem("token") || null,
  user: null,
  error: null,

  isAuthenticated: !localStorage.getItem("token"),
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
      state.isAuthenticated = true;
      localStorage.setItem("token", action.payload.token);
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
    },
    loginFailed: (state, action: PayloadAction<{ error: string }>) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
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

// Function to handle login and dispatch appropriate actions
export const handleLogin = (
  dispatch: any,
  loginData: { email: string; password: string }
) => {
  // Example validation logic
  if (!loginData.email || !loginData.password) {
    dispatch(loginFailed({ error: "Please fill in all required fields." }));
  } else if (loginData.password.length < 8) {
    dispatch(
      loginFailed({ error: "Password must be at least 8 characters long." })
    );
  } else {
    // Add your login logic here, e.g., API call
    // Simulated example of a failed API call
    const apiCallSuccess = false; // Change to true to simulate successful login
    if (apiCallSuccess) {
      dispatch(
        loginSuccess({ token: "example_token", user: { name: "John Doe" } })
      );
    } else {
      dispatch(
        loginFailed({ error: "Invalid email or password. Please try again." })
      );
    }
  }
};
