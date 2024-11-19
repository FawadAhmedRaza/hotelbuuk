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
    resend_verify_user_OTP: "/auth/confirm-signup-otp/resend",
    setup_user_type: "/auth/set-user-type",
    setup_basic_info: "/auth/set-basic-info",
    setup_basic_info_guest: "/auth/set-basic-info",
    complete_profile: "/auth/complete-profile",
    forget_password: {
      request_otp: "/auth/forget-password",
      verify_forget_password_otp: "/auth/forget-password/forget-password-otp",
      resend_forget_password_otp: "/auth/forget-password/resend-otp",
      reset_password: "/auth/reset-password",
    },
  },
  hotel: {
    root: "/hotel",
    create: "/hotel/hotel-info",
    update: (id) => `/hotel/hotel-info/${id}`,
    facilites: {
      create: "/hotel/hotel-facilities",
      get_all: (id) => `/hotel/hotel-facilities?userId=${id}`,
    },
    roomFacilites: {
      create: "/hotel/room-facilities",
      get_all: (id) => `/hotel/room-facilities?userId=${id}`,
    },
    getHotel: (id) => `/hotel/hotel-info/${id}`,
    updateHotel: (id) => `/hotel/hotel-info/${id}`,
    roomTypes: {
      create: "/hotel/room-types",
      get_all: (id) => `/hotel/room-types?userId=${id}`,
    },
    rooms: {
      create: "/hotel/rooms",
      get_all_rooms: (id) => `/hotel/rooms?hotel_id=${id}`,
      get_by_id: (id) => `/hotel/rooms/${id}`,
      update_room: (id) => `/hotel/rooms/${id}`,
      delete_room: (id) => `/hotel/rooms/${id}`,
    },

    inviteNomads: "/hotel/invite-nomad",
    rejecteRequest: "/hotel/invite-nomad/reject",
    internalNomad: (id) => `/hotel/invite-nomad?hotel_id=${id}`,
    availableNomads: (id) =>
      `/hotel/invite-nomad/available-nomads?hotel_id=${id}`,
    event: {
      create: "/hotel/events",
      getAll: (id) => `/hotel/events?user_id=${id}`,
      getById: (id) => `/hotel/events/${id}`,
      updateById: (id) => `/hotel/events/${id}`,
      deleteById: (id) => `/hotel/events/${id}`,
    },
  },
  guest: {
    get_profile: (id) => `/guest/profile/${id}`,
    update_profile: (id) => `/guest/profile/${id}`,
    bookings: {
      get_all: (id) => `/guest/bookings?user_id=${id}`,
    },
  },
  nomad: {
    root: "/nomad",
    create: "/nomad/nomad-profile",
    getSingleNomad: (id) => `/nomad/${id}`,
    getProfile: (id) => `/nomad/nomad-profile/${id}`,
    updateProfile: (id) => `/nomad/nomad-profile/${id}`,
    deleteProfile: (id) => `/nomad/nomad-profile/${id}`,

    amenities: {
      create: "/nomad/event-amenities",
      getAll: (id) => `/nomad/event-amenities?userId=${id}`,
    },
    event: {
      create: "/nomad/event",
      getEvents: (id) => `/nomad/event?user_id=${id}`,

      getById: (id) => `/nomad/event/${id}`,
      delete_by_id: (id) => `/nomad/event/${id}`,
      updateById: (id) => `/nomad/event/${id}`,
    },
  },
  events: {
    root: "/all-events",
    getById: (id, type) => `/all-events/${id}?type=${type}`,
    rules: {
      create: "/event-rules",
      getAll: (id) => `/event-rules?user_id=${id}`,
    },
    safety: {
      create: "/event-safety",
      getAll: (id) => `/event-safety?user_id=${id}`,
    },
    policy: {
      create: "/event-policy",
      getAll: (id) => `/event-policy?user_id=${id}`,
    },
  },
  booking: {
    book_event: "/bookings",
    update_booking_paid_status: (id) => `/bookings/${id}`,
    get_all_bookings: (id, type) => `/bookings?user_id=${id}&type=${type}`,
    get_recent_bookings: (id, type) =>
      `/bookings/recent-bookings?user_id=${id}&type=${type}`,
    get_user_booking: (userId, eventId, type) =>
      `/bookings/get-user-booking?user_id=${userId}&event_id=${eventId}&type=${type}`,
    update_accepted_booking: (id) => `/bookings/${id}`,
  },
  contact: "/contact",
  notifications: (id) => `/notifications?user_id=${id}`,
  wishlist: {
    root: "/wishlist",
    getAllWishList: (id) => `/wishlist?user_id=${id}`,
    getWishById: (user_id, id) =>
      `/wishlist/${user_id}?user_id=${user_id}&event_id=${id}`,
    deleteWish: (user_id, id) =>
      `/wishlist/${user_id}?user_id=${user_id}&event_id=${id}`,
  },
};
