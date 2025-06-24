import axios from 'axios';
import { store } from '../redux/store/store';

// Create an axios instance with default configurations
const apiClient = axios.create({
  baseURL: 'http://localhost:8000/api/dharmacy',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the auth token in requests
apiClient.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.auth.token;
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Log the full URL being called
    const fullUrl = `${config.baseURL || ''}${config.url || ''}`;
    console.log(`API Call: ${config.method?.toUpperCase() || 'GET'} ${fullUrl}`);
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle common response issues
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle specific error codes here
    if (error.response) {
      console.log(`Error Response: ${error.response.status} - ${error.response.statusText}`);
      if (error.response.status === 401) {
        // Unauthorized - token expired or invalid
        // You might want to dispatch a logout action here
        console.log('Authentication error. Please log in again.');
      } else if (error.response.status === 404) {
        console.log('Resource not found.');
      } else if (error.response.status === 500) {
        console.log('Server error. Please try again later.');
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.log('No response from server. Please check your network connection.');
    } else {
      console.log('Error in request setup:', error.message);
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;
