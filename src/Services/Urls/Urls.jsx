import axios from "axios";
import Cookies from 'js-cookie';

export const baseURL = "https://api.modelstar-eg.com";

export const publicAxiosInstance = axios.create({ baseURL });

export const privateAxiosInstance = axios.create({ baseURL });

privateAxiosInstance.interceptors.request.use((config) => {
  const token = Cookies.get('token');
  console.log("Token being sent:", token);

  config.headers['Content-Type'] = 'application/json';
  config.headers['Accept'] = 'application/json';

  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  return config;
});

export default privateAxiosInstance;


export const PRODUCTS_URLS = {
    create: `products/create`,
    display: `products/getproducts`,
    update: (id) => `products/update/${id}`,
    delete: (id) => `products/delete/${id}`,
    product_details: (id) => `products/getbyid/${id}`,
}

export const CATEGORIES_URLS = {
    create: `categories/create`,
    display: `categories/all`,
    update: (id) => `categories/update/${id}`,
    delete: (id) => `categories/delete/${id}`,
    product_details: (id) => `categories/getbyid/${id}`,
}


export const AUTH_URLS = {
    signup: `auth/signup`,
    login: `auth/login`,
    logout: `auth/logout`,
}

