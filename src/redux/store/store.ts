import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authReducer from '../slices/authSlice';
import productReducer from '../slices/productSlice';
import cartReducer from '../slices/cartSlice';
import categoryReducer from '../slices/categorySlice';
import orderReducer from '../slices/orderSlice';


const authPersistConfig = {
  key: 'auth',
  storage: AsyncStorage,
  whitelist: ['user', 'token'] // Only persist user and token
};

const cartPersistConfig = {
  key: 'cart',
  storage: AsyncStorage,
  whitelist: ['items', 'totalAmount', 'orders'] // Persist cart items and orders
};


const categoryPersistConfig = {
  key: 'categories',
  storage: AsyncStorage,
  whitelist: ['categories'] // Persist categories
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedCartReducer = persistReducer(cartPersistConfig, cartReducer);
const persistedCategoryReducer = persistReducer(categoryPersistConfig, categoryReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    products: productReducer,
    cart: persistedCartReducer,
    categories: persistedCategoryReducer, // Include categories if needed
    orders: orderReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;