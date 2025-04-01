import { combineReducers, configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./slices/categorySlice";
import { authReducer } from "./slices/authSlice";
import { persistReducer, persistStore } from "redux-persist";
import favoriteReducer from "./slices/favoriteSlice";
import chatReducer from "./slices/chatSlice";
import storage from "redux-persist/lib/storage";
import searchReducer from "./slices/searchSlice";

// Combine reducers first
const rootReducer = combineReducers({
  categories: categoryReducer,
  auth: persistReducer(
    {
      key: "auth",
      storage,
    },
    authReducer
  ),
  favorites: favoriteReducer,
  chat: chatReducer,
  search: searchReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
