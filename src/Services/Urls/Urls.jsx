import axios from "axios";

// export const baseURL = "http://168.231.104.227:3000/";
export const baseURL = "https://wwww.modelstar-eg.com:api/";

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
  products_by_category: (categoryId) => `products/bycategory/${categoryId}`,
  create: `admin/create_products`,
  update: (id) => `admin/update_products/${id}`,
  delete: (id) => `admin/delete_products/${id}`,
  product_details: (id) => `products/getbyid/${id}`,
}

export const OFFERS_PRODUCTS = {
  offers: 'offers/products-with-offers',
}

export const CATEGORIES_URLS = {
  categories: `categories/all`,
  create: `admin/create_category`,
  update: (id) => `admin/update_category/${id}`,
  delete: (id) => `admin/delete_category/${id}`,
  product_details: (id) => `categories/${id}`,
}

export const USERS_URLS = {
  users: `admin/get_users`,
  create: `admin/create_user`,
  update: (id) => `admin/update_user/${id}`,
  update_role: (id) => `admin/update_userrole/${id}`,
  delete: (id) => `admin/delete_user/${id}`,
  user_details: (id) => `users/${id}`,
}


export const AUTH_URLS = {
  signup: `auth/signup`,
  login: `auth/login`,
  forgetPassword: `auth/sendforgotpassword`,
  resetPassword: `auth/verifypassword`,
  logout: `auth/logout`,
}

