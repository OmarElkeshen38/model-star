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

