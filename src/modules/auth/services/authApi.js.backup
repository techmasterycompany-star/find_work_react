import apiClient from '../../../services/apiClient';


export const register = (role, data) =>
  apiClient.post(`/auth/register/${role}`, data).then((res) => res.data);

export const login = ({ email, password }) =>
  apiClient.post('/auth/login', { email, password }).then((res) => res.data.data);

export const getCurrentUser = () =>
  apiClient.get('/auth/me').then((res) => res.data.data);

export const logout = () =>
  apiClient.post('/auth/logout').then((res) => res.data);

export const verifyEmail = (token) =>
  apiClient.get(`/auth/verify-email/${token}`).then((res) => res.data);

export const requestPasswordReset = (email) =>
  apiClient.post('/auth/forgot-password', { email }).then((res) => res.data);

export const resetPassword = (token, newPassword) =>
  apiClient.post(`/auth/reset-password/${token}`, { newPassword }).then((res) => res.data);
