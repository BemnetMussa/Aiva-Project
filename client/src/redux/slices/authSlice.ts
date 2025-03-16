import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import getCookie from "../../util/retriveCookies";

type User = {
  _id: string;
  name: string;
  email: string;
  admin: boolean;
  gender: "male" | "female";
  dob: Date;
  agree: boolean;
  createdAt: string;
  updatedAt: string;
};

interface AuthState {
  token: string | null;
  user: User | null;
  error: string | null;
  isAuthenticated: boolean;
}

const tokenFromCookie = getCookie("accessToken");

const initialState: AuthState = {
  token: tokenFromCookie || null,
  user: null,
  error: null,
  isAuthenticated: !!tokenFromCookie,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (
      state,
      action: PayloadAction<{ token: string; user: any }>
    ) => {
      state.token = getCookie("accessToken");
      state.user = action.payload.user;
      state.error = null;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
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
  whitelist: ["token", "isAuthenticated"],
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
        loginSuccess({
          user: { name: "John Doe" },
          token: tokenFromCookie ?? "",
        })
      );
    } else {
      dispatch(
        loginFailed({ error: "Invalid email or password. Please try again." })
      );
    }
  }
};
