import axios from "axios";
import Cookies from 'js-cookie';

// export const baseURL="https://api.c3.com.sa/";
export const baseURL = "https://staging.c3.com.sa/";

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


export const AUTH_URLS = {
    Login: `api/login`,
    Register: `api/register`,
    Forget_Pass: `api/forget-password`,
    Reset_Pass: `api/reset-password`,
    Change_Pass: `api/change-password`,
}
export const companyStrengthUrls = {
    daily_attendance: `api/employees/stats/daily_attendance`,
    by_status: `api/employees/stats/by_status`,
    totals: `api/employees/stats/totals?filter[status]=working`,
    hiring: `api/employees/stats/hiring?filter[date_between]=2021-01-01,2026-01-01`,
    employees: `api/employees/stats`,
}
