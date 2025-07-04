import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchMyOrders } from '../../utils/myOrdersApi';

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  vendorId: string;
  _id: string;
}

export interface ShippingAddress {
  fullName: string;
  addressLine1: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface Order {
  _id: string;
  shippingAddress: ShippingAddress;
  items: OrderItem[];
  paymentStatus: string;
  totalAmount: number;
  shippingFee: number;
  taxAmount: number;
  orderStatus: 'delivered' | 'processing' | 'cancelled';
  isPaid: boolean;
  createdBy: string;
  createdAt: string;
}

interface OrdersState {
  orders: Order[];
  loading: boolean;
  error: string | null;
}

const initialState: OrdersState = {
  orders: [],
  loading: false,
  error: null,
};

export const fetchOrders = createAsyncThunk('orders/fetchOrders', async (_, thunkAPI) => {
  try {
    const res = await fetchMyOrders();
    if (res?.orders?.success && Array.isArray(res.orders.data)) {
      return res.orders.data as Order[];
    } else {
      return thunkAPI.rejectWithValue('No orders found');
    }
  } catch (error) {
    return thunkAPI.rejectWithValue('Failed to load orders');
  }
});

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchOrders.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action: PayloadAction<Order[]>) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.orders = [];
      });
  },
});

export default orderSlice.reducer;
