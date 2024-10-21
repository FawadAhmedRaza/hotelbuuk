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
    root: "/hotel",
    create: "/hotel/hotel-info",
    facilites: {
      create: "/hotel/hotel-facilities",
      get_all: (id) => `/hotel/hotel-facilities?userId=${id}`,
    },
    getHotel: (id) => `/hotel/hotel-info/${id}`,
    updateHotel: (id) => `/hotel/hotel-info/${id}`,
    roomTypes: {
      create: "/hotel/room-types",
      get_all: (id) => `/hotel/room-types?userId=${id}`,
    },
    rooms:{
      create:"/hotel/rooms"
    }
  },
  nomad: {
    root: "/nomad",
    create: "/nomad/nomad-profile",
    getProfile: (id) => `/nomad/nomad-profile/${id}`,
    updateProfile: (id) => `/nomad/nomad-profile/${id}`,
  },
};
