import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

// User search type
interface User {
  _id: string;
  name: string;
  email: string;
  image: string;
}

// Initial state for the search slice
interface SearchState {
  searchTerm: string;
  searchResults: User[];
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: SearchState = {
  searchTerm: "",
  searchResults: [],
  loading: false,
  error: null,
};

// Thunk to search for users
export const searchUsers = createAsyncThunk(
  "search/searchUsers",
  async (query: string, { rejectWithValue }) => {
    try {
      console.log(query);
      const res = await fetch(
        `http://localhost:5000/api/user/search?search=${query}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await res.json();
      console.log(data);
      if (!res.ok) throw new Error(data.message);
      return data;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

// Create search slice
const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload;
      })
      .addCase(searchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setSearchTerm } = searchSlice.actions;
export default searchSlice.reducer;
