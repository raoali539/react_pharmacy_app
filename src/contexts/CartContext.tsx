import React, { createContext, useContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  vendorName: string;
}

interface CartState {
  items: CartItem[];
  savedItems: CartItem[];
  total: number;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'SAVE_FOR_LATER'; payload: CartItem }
  | { type: 'REMOVE_FROM_SAVED'; payload: string }
  | { type: 'MOVE_TO_CART'; payload: CartItem }
  | { type: 'LOAD_CART'; payload: CartState };

const CART_STORAGE_KEY = '@pharmacy_cart';

const initialState: CartState = {
  items: [],
  savedItems: [],
  total: 0,
};

const calculateTotal = (items: CartItem[]): number => {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  let newState: CartState;

  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItemIndex = state.items.findIndex(
        item => item.productId === action.payload.productId
      );

      if (existingItemIndex > -1) {
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + action.payload.quantity,
        };
        newState = {
          ...state,
          items: updatedItems,
          total: calculateTotal(updatedItems),
        };
      } else {
        const updatedItems = [...state.items, action.payload];
        newState = {
          ...state,
          items: updatedItems,
          total: calculateTotal(updatedItems),
        };
      }
      break;
    }

    case 'REMOVE_ITEM': {
      const updatedItems = state.items.filter(item => item.id !== action.payload);
      newState = {
        ...state,
        items: updatedItems,
        total: calculateTotal(updatedItems),
      };
      break;
    }

    case 'UPDATE_QUANTITY': {
      const updatedItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      newState = {
        ...state,
        items: updatedItems,
        total: calculateTotal(updatedItems),
      };
      break;
    }

    case 'SAVE_FOR_LATER': {
      newState = {
        ...state,
        savedItems: [...state.savedItems, action.payload],
        items: state.items.filter(item => item.id !== action.payload.id),
        total: state.total - (action.payload.price * action.payload.quantity),
      };
      break;
    }

    case 'REMOVE_FROM_SAVED': {
      newState = {
        ...state,
        savedItems: state.savedItems.filter(item => item.id !== action.payload),
      };
      break;
    }

    case 'MOVE_TO_CART': {
      newState = {
        ...state,
        items: [...state.items, action.payload],
        savedItems: state.savedItems.filter(item => item.id !== action.payload.id),
        total: state.total + (action.payload.price * action.payload.quantity),
      };
      break;
    }

    case 'CLEAR_CART':
      newState = initialState;
      break;

    case 'LOAD_CART':
      newState = action.payload;
      break;

    default:
      newState = state;
  }

  // Persist the new state to AsyncStorage
  AsyncStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newState)).catch(error => {
    console.error('Error saving cart state:', error);
  });

  return newState;
};

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
  addToCart: (item: CartItem) => void;
} | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    // Load saved cart state when the app starts
    const loadSavedCart = async () => {
      try {
        const savedCart = await AsyncStorage.getItem(CART_STORAGE_KEY);
        if (savedCart) {
          dispatch({ type: 'LOAD_CART', payload: JSON.parse(savedCart) });
        }
      } catch (error) {
        console.error('Error loading saved cart:', error);
      }
    };

    loadSavedCart();
  }, []);

  const addToCart = (item: CartItem) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };

  return (
    <CartContext.Provider value={{ state, dispatch, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};