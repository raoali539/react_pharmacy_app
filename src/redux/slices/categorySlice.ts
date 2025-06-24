import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../utils/apiClient';

interface Category {
  id: string;
  name: string;
  description?: string;
}

interface CategoryState {
  categories: Category[];
  loading: boolean;
  error: null | string;
}

const initialState: CategoryState = {
  categories: [],
  loading: false,
  error: null,
};

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get('/v1/getAllCategories');
      // Check if response.data exists and return the appropriate structure
      const categories = response.data?.data || response.data || [];
      console.log('Fetched categories:', categories);
      return categories;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch categories');
    }
  }
);

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        console.log('Fetching categories...');
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        console.log('Categories fetched successfully:', action);
        state.loading = false;
        state.categories = action.payload;
        state.error = null;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        console.error('Failed to fetch categories:', action.payload);
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default categorySlice.reducer;