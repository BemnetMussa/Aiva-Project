
import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './slices/categorySlice';
import { authReducer } from './slices/authSlice';
import persistStore from 'redux-persist/es/persistStore';
import favoriteReducer from "./slices/favoriteSlice"


export const store = configureStore({
  reducer: {
    categories: categoryReducer,
    auth: authReducer,
    favorites: favoriteReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false})
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
  
export const persister = persistStore(store)