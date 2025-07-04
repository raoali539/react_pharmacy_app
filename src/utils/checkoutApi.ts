import apiClient from './apiClient';

export const checkout = async (payload: any) => {
  // POST to /dharmacy/v1/checkOut (apiClient already has /dharmacy/v1 as baseURL)
  return apiClient.post('/checkOut', payload);
};
