import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export interface Category {
  _id: string;
  name: string;
  userId: string;
  createdAt: Date;
}

interface CategoryState {
  categories: Category[];
  activeCategory: string;
  wishlistCategory: Category | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

// setting the initial state for react redux
const initialState: CategoryState = {
  categories: [],
  activeCategory: "",
  wishlistCategory: null,
  status: "idle",
  error: null,
};

// Async thunk for fetching categories from the backend
export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    const response = await fetch("http://localhost:5000/api/categories", {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }
    return await response.json();
  }
);

// Async thunk for creating a new category
export const createCategory = createAsyncThunk(
  "categories/createCategory",
  async (name: string) => {
    const response = await fetch(
      "http://localhost:5000/api/categories/create",
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to create category");
    }
    return await response.json();
  }
);

// remove category
export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",

  async (categoryId: string) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/categories/delete/?id=${categoryId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (response) {
        
      }
    } catch (error) {
      console.error("Error deleting a category:", error);
    }
  }
);

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setActiveCategory: (state, action: PayloadAction<string>) => {
      state.activeCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchCategories
      .addCase(fetchCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchCategories.fulfilled,
        (state, action: PayloadAction<Category[]>) => {
          state.status = "succeeded";
          state.categories = action.payload;

          // Find wishlist category
          state.wishlistCategory =
            action.payload.find(
              (category) => category.name.toLowerCase() === "wishlist"
            ) || null;

          // Set active category to wishlist if available
          if (state.wishlistCategory && !state.activeCategory) {
            state.activeCategory = state.wishlistCategory._id;
          }
        }
      )
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Something went wrong";
      })

      // Handle createCategory
      .addCase(
        createCategory.fulfilled,
        (state, action: PayloadAction<Category>) => {
          state.categories.push(action.payload);

          // If this is a new wishlist category, update wishlistCategory
          if (action.payload.name.toLowerCase() === "wishlist") {
            state.wishlistCategory = action.payload;
          }
        }
      );
  },
});

export const { setActiveCategory } = categorySlice.actions;
export default categorySlice.reducer;
