import React, { createContext, useContext, useReducer } from 'react';

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
  | { type: 'MOVE_TO_CART'; payload: CartItem };

const initialState: CartState = {
  items: [],
  savedItems: [],
  total: 0,
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.productId === action.payload.productId);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.productId === action.payload.productId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
          total: state.total + action.payload.price,
        };
      }
      return {
        ...state,
        items: [...state.items, action.payload],
        total: state.total + action.payload.price,
      };
    }

    case 'REMOVE_ITEM': {
      const item = state.items.find(i => i.id === action.payload);
      return {
        ...state,
        items: state.items.filter(i => i.id !== action.payload),
        total: state.total - (item ? item.price * item.quantity : 0),
      };
    }

    case 'UPDATE_QUANTITY': {
      const item = state.items.find(i => i.id === action.payload.id);
      if (!item) return state;

      const quantityDiff = action.payload.quantity - item.quantity;
      return {
        ...state,
        items: state.items.map(i =>
          i.id === action.payload.id
            ? { ...i, quantity: action.payload.quantity }
            : i
        ).filter(i => i.quantity > 0),
        total: state.total + (item.price * quantityDiff),
      };
    }

    case 'SAVE_FOR_LATER': {
      return {
        ...state,
        savedItems: [...state.savedItems, action.payload],
        items: state.items.filter(item => item.id !== action.payload.id),
        total: state.total - (action.payload.price * action.payload.quantity),
      };
    }

    case 'REMOVE_FROM_SAVED': {
      return {
        ...state,
        savedItems: state.savedItems.filter(item => item.id !== action.payload),
      };
    }

    case 'MOVE_TO_CART': {
      return {
        ...state,
        items: [...state.items, action.payload],
        savedItems: state.savedItems.filter(item => item.id !== action.payload.id),
        total: state.total + (action.payload.price * action.payload.quantity),
      };
    }

    case 'CLEAR_CART':
      return initialState;

    default:
      return state;
  }
};

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
  addToCart: (item: CartItem) => void;
} | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

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