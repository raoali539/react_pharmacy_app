import apiClient from './apiClient';

export const fetchMyOrders = async () => {
  try {
    const response = await apiClient.get('/myOrders');
    return response.data;
  } catch (error) {
    throw error;
  }
};
