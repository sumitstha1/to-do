import api from '../utils/api';
import jwt from 'jsonwebtoken';

import Cookies from 'js-cookie';

const isServer = typeof window === 'undefined';

export const login = async (email, password) => {
  try {
    const response = await api.post(process.env.API_URL + '/api/v1/account/login/', { email, password });
    const { access_token, refresh_token } = response.data;


    if (!isServer) {
      // Store the tokens in localStorage or a secure cookie
      // localStorage.setItem('access_token', access_token);
      // localStorage.setItem('refresh_token', refresh_token);
      Cookies.set('access_token', access_token, { expires: 90 });
      Cookies.set('refresh_token', refresh_token, { expires: 90 });
    }

    return true;
  } catch (error) {
    console.error('Login failed:', error);
    return false;
  }
};

export const logout = () => {
  if (!isServer) {
    // Remove tokens from localStorage or cookies
    // localStorage.removeItem('access_token');
    // localStorage.removeItem('refresh_token');
    Cookies.remove('access_token');
    Cookies.remove('refresh_token');
  }
};

export const isAuthenticated = () => {
  if (isServer) {
    return false;
  }

  // const access_token = localStorage.getItem('access_token');
  // const refresh_token = localStorage.getItem('refresh_token');
  const access_token = Cookies.get('access_token');
  const refresh_token = Cookies.get('refresh_token');

  // Check if tokens exist and are not expired
  return access_token && refresh_token && !isTokenExpired(access_token);
};

const isTokenExpired = (token) => {
  const decoded = jwt.decode(token);
  if (!decoded) return true;

  const currentTime = Date.now() / 1000;
  return decoded.exp < currentTime;
};
