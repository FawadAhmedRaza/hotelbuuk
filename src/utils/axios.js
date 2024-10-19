import axios from "axios";

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: "/api" });

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || "Something went wrong"
    )
);

export default axiosInstance;

// ----------------------------------------------------------------------

export const fetcher = async (args) => {
  const [url, config] = Array.isArray(args) ? args : [args];

  const res = await axiosInstance.get(url, { ...config });

  return res.data;
};

// ----------------------------------------------------------------------

export const endpoints = {
  AUTH: {
    signup: "/auth/signup",
    login: "/auth/login",
    verify_user_OTP: "/auth/confirm-signup-otp",
    setup_user_type: "/auth/set-user-type",
    forget_password: {
      request_otp: "/auth/forget-password",
      verify_forget_password_otp: "/auth/forget-password/forget-password-otp",
      reset_password: "/auth/reset-password",
    },
  },
  hotel: {
    facilites: {
      create: "/hotel-facilities",
      get_all: (id) => `/hotel-facilities?userId=${id}`,
    },
  },
};
