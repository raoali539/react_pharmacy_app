// Export all Redux components from a central location
import { store, persistor } from './store/store';
import { useAppDispatch, useAppSelector } from './hooks';

// Auth slice exports
import authReducer, { 
  loginUser, 
  registerUser, 
  signUpWithGoogle,
  logout, 
  clearError as clearAuthError 
} from './slices/authSlice';

// Product slice exports
import productReducer, { 
  getAllProducts, 
  getProductByCategory, 
  getProductById, 
  sellProduct, 
  clearProductError, 
  addProduct
} from './slices/productSlice';

// Cart slice exports
import cartReducer, { 
  addToCart, 
  removeFromCart, 
  updateQuantity, 
  clearCart, 
  checkOut, 
  clearCartError 
} from './slices/cartSlice';

export {
  // Store
  store,
  persistor,
  
  // Hooks
  useAppDispatch,
  useAppSelector,
  
  // Auth slice
  authReducer,
  loginUser,
  registerUser,
  signUpWithGoogle,
  logout,
  clearAuthError,
  
  // Product slice
  productReducer,
  getAllProducts,
  getProductByCategory,
  getProductById,
  sellProduct,
  clearProductError,
  addProduct,
  
  // Cart slice
  cartReducer,
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  checkOut,
  clearCartError,
};
