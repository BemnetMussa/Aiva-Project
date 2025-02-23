import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface favorite {
  _id: string;
  name: string;
  userId: string;
  createdAt: Date;
}

interface favoriteState {
  favorites: favorite[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

// setting the initial state for react redux
const initialState: favoriteState = {
  favorites: [],
  status: "idle",
  error: null,
};

export const fetchFavorites = createAsyncThunk(
  "favorites/fetchFavorites",
  async () => {
    try {
      const response = await fetch("http://localhost:5000/api/favorites", {
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch favorites");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error("Error fetching favorites:");
    }
  }
);

export const addFavorite = createAsyncThunk(
  "favorites/addFavorite",
  async ({
    propertyId,
    categoryId,
  }: {
    propertyId: string;
    categoryId: string;
  }) => {
    try {
      const response = await fetch("http://localhost:5000/api/favorites/add", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ propertyId, categoryId }),
      });

      if (!response.ok) {
        throw new Error("Failed to add property to favorites.");
      }

      const favorite = await response.json();
      console.log("property added to favorites successfully" , favorite)
      console.log(propertyId, categoryId)
      return favorite; // Return the favorite item
    } catch (error) {
      console.error("Error adding property to favorites:", error);
      throw error; // Throw error to handle rejection case
    }
  }
);

const favoriteSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle fetchFavorites
      .addCase(fetchFavorites.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchFavorites.fulfilled,
        (state, action: PayloadAction<favorite[]>) => {
          state.status = "succeeded";
          state.favorites = action.payload;
        }
      )
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Something went wrong";
      })

      // handle addFavorite
      .addCase(addFavorite.pending, (state) => {
        state.status = "loading";
      })

      .addCase(
        addFavorite.fulfilled,
        (state, action: PayloadAction<favorite>) => {
          state.status = "succeeded";
          state.favorites.push(action.payload);
        }
      )
      .addCase(addFavorite.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "something went wrong";
      });
  },
});

export default favoriteSlice.reducer;
