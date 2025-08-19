import axios from "axios";

export const baseURL = "http://168.231.104.227:3000/";

export const publicAxiosInstance = axios.create({ baseURL });

export const privateAxiosInstance = axios.create({ baseURL });

privateAxiosInstance.interceptors.request.use((config) => {
  const getToken = () => localStorage.getItem("accessToken");
  const token = getToken();
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
  products: `products/getproducts`,
  create: `admin/create_products`,
  update: (id) => `admin/update_products/${id}`,
  delete: (id) => `admin/delete_products/${id}`,
  product_details: (id) => `admin/get_product/${id}`,
}

export const CATEGORIES_URLS = {
  categories: `categories/all`,
  create: `admin/create_category`,
  update: (id) => `admin/update_category/${id}`,
  delete: (id) => `admin/delete_category/${id}`,
  product_details: (id) => `categories/${id}`,
}


export const AUTH_URLS = {
  signup: `auth/signup`,
  login: `auth/login`,
  forgetPassword: `auth/sendforgotpassword`,
  resetPassword: `auth/verifypassword`,
  logout: `auth/logout`,
}

