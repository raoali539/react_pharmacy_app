import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../utils/apiClient';

interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface Order {
  id: string;
  items: CartItem[];
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  orderDate: string;
  deliveryAddress?: string;
  paymentMethod: string;
  // Add other order details as needed
}

interface CartState {
  items: CartItem[];
  totalAmount: number;
  orders: Order[];
  isLoading: boolean;
  error: string | null;
}

const initialState: CartState = {
  items: [],
  totalAmount: 0,
  orders: [],
  isLoading: false,
  error: null,
};

// Async thunk for checkout
export const checkOut = createAsyncThunk(
  'cart/checkOut',
  async (checkoutData: { items: CartItem[], deliveryAddress: string, paymentMethod: string }, { rejectWithValue }) => {
    try {
      const response = await apiClient.post('/v1/checkOut', checkoutData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Checkout failed');
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id, productId, name, price, quantity = 1, image } = action.payload;
      const existingItem = state.items.find(item => item.productId === productId);
      
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({
          id: id || productId, // Use provided id or fallback to productId
          productId,
          name,
          price,
          quantity,
          image,
        });
      }
      
      state.totalAmount = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    },
    
    removeFromCart: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter(item => item.productId !== productId);
      state.totalAmount = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    },
    
    updateQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const item = state.items.find(item => item.productId === productId);
      
      if (item) {
        item.quantity = quantity;
        state.totalAmount = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
      }
    },
    
    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
    },
    
    clearCartError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Checkout cases
    builder
      .addCase(checkOut.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(checkOut.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = [...state.orders, action.payload.order];
        state.items = [];
        state.totalAmount = 0;
        state.error = null;
      })
      .addCase(checkOut.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { 
  addToCart, 
  removeFromCart, 
  updateQuantity, 
  clearCart, 
  clearCartError 
} = cartSlice.actions;

export default cartSlice.reducer;
