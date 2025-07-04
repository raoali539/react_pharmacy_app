import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../utils/apiClient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { act } from 'react';

interface Address {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

interface ProfilePicture {
  url: string;
}

interface User {
  _id: string;
  userName: string;
  email: string;
  contactNumber: string;
  profilePicture: ProfilePicture;
  totalSales: number;
  accountStatus: boolean;
  totalRating: number;
  address: Address;
  token?: string;
  role?: 'User' | 'Vendor'; // Optional role field
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isLoading: false,
  error: null,
};

// Async thunks for authentication
export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string; userType: 'User' | 'Vendor' }, { rejectWithValue }) => {
    try {
      const response = await apiClient.post(`/login?loginType=${
        credentials.userType === 'Vendor' ? 2 : 1
      }`, credentials);
      // Store user and token in AsyncStorage
      const { user } = response.data;
      // Some APIs return token inside user, some at root. Adjust as needed.
      const token = response.data.token || user.token;
      await AsyncStorage.setItem('user', JSON.stringify(user));
      await AsyncStorage.setItem('token', token);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData: { email: string; password: string; name: string; userType: 'User' | 'Vendor' }, { rejectWithValue }) => {
    try {
      const response = await apiClient.post('/register', userData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Registration failed');
    }
  }
);

export const signUpWithGoogle = createAsyncThunk(
  'auth/signUpWithGoogle',
  async (googleData: { token: string; userInfo?: any }, { rejectWithValue }) => {
    try {
      const response = await apiClient.post('/v1/signupwithgoogle', googleData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Google sign up failed');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Login cases
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        // Store all user info in Redux store
        state.user = {
          _id: action.payload.user._id,
          userName: action.payload.user.userName,
          email: action.payload.user.email,
          contactNumber: action.payload.user.contactNumber,
          profilePicture: action.payload.user.profilePicture,
          totalSales: action.payload.user.totalSales,
          accountStatus: action.payload.user.accountStatus,
          totalRating: action.payload.user.totalRating,
          address: action.payload.user.address,
          token: action.payload.user.token,
          role: action.payload.redirect == "/userHome" ? "User" : "Vendor",
        };
        state.token = action.payload.token || action.payload.user.token;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Register cases
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
      
    // Google Sign Up cases
    builder
      .addCase(signUpWithGoogle.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signUpWithGoogle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(signUpWithGoogle.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;