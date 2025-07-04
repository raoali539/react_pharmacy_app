import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from '../slices/categorySlice';
import orderReducer from '../slices/orderSlice';

export const store = configureStore({
  reducer: {
    categories: categoryReducer,
    orders: orderReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;