import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../utils/apiClient';

interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  category: string;
  image?: string;
  stock: number;
  // Add other product properties as needed
}

interface ProductsState {
  products: Product[];
  lowstockProducts?: Product[]; // Optional property for low stock products
  highstockProducts?: Product[]; // Optional property for high stock products
  filteredProducts: Product[];
  selectedProduct: Product | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  products: [],
  filteredProducts: [],
  selectedProduct: null,
  isLoading: false,
  error: null,
  lowstockProducts: [], // Initialize as empty array
  highstockProducts: [], // Initialize as empty array
};

// Async thunks for product-related operations
export const getAllProducts = createAsyncThunk(
  'products/getAllProducts',
  async (_, { rejectWithValue }) => {
    try {
      const AllProducts = await apiClient.get('/products?type=1');
      console.log('Fetched products:', AllProducts);
      return AllProducts.data;
    } catch (error: any) {
      console.error('Error fetching products:', error);
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch products');
    }
  }
);

export const getLowStockProducts = createAsyncThunk(
  'products/getLowStockProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get('/products?type=2');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch low stock products');
    }
  }
);

export const getHighStockProducts = createAsyncThunk(
  'products/getHighStockProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get('/products?type=3');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch high stock products');
    }
  }
);

export const getProductByCategory = createAsyncThunk(
  'products/getProductByCategory',
  async (category: string, { rejectWithValue }) => {
    try {
      const response = await apiClient.get('/v1/productbycategory', {
        params: { category }
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch products by category');
    }
  }
);

export const getProductById = createAsyncThunk(
  'products/getProductById',
  async (productId: string, { rejectWithValue }) => {
    try {
      const response = await apiClient.get('/v1/productbyid', {
        params: { id: productId }
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch product details');
    }
  }
);

export const sellProduct = createAsyncThunk(
  'products/sellProduct',
  async (productData: Partial<Product>, { rejectWithValue }) => {
    try {
      const response = await apiClient.post('/v1/sellproduct', productData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add product');
    }
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearProductError: (state) => {
      state.error = null;
    },
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
  },
  extraReducers: (builder) => {
    // Get All Products cases
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log('Fetched products:', action.payload.products);
        state.products = action.payload.products;
        state.filteredProducts = action.payload.products;
        state.error = null;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Get Product By Category cases
    builder
      .addCase(getProductByCategory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getProductByCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.filteredProducts = action.payload.products;
        state.error = null;
      })
      .addCase(getProductByCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Get Low Stock Products cases
    builder
      .addCase(getLowStockProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getLowStockProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.lowstockProducts = action.payload.products;
        state.error = null;
      })
      .addCase(getLowStockProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });


    // Get High Stock Products cases
    builder
      .addCase(getHighStockProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getHighStockProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.highstockProducts = action.payload.products;
        state.error = null;
      })
      .addCase(getHighStockProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Get Product By ID cases
    builder
      .addCase(getProductById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedProduct = action.payload.product;
        state.error = null;
      })
      .addCase(getProductById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Sell Product cases (admin)
    builder
      .addCase(sellProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(sellProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = [...state.products, action.payload.product];
        state.error = null;
      })
      .addCase(sellProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearProductError, clearSelectedProduct } = productSlice.actions;
export default productSlice.reducer;
