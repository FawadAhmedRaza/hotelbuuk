export const paths = {
  root: "/",
  notFoeund: "/*",
  auth: {
    root: "/",
    login: "/login",
    signUp: "/sign-up",
    OTPCode: "verify-code",
    set_user_type: "/setup-user-profile",
    setup_basic_info_nomad: "/setup-basic-info-nomad",
    setup_basic_info_hotel: "/setup-basic-info-hotel",
    setup_basic_info_guest: "/setup-basic-info-guest",
    forgotPassword: "/forgot-password",
    changePassword: "/change-password",
  },
  about: "/about",
  terms: "/terms",
  chats: {
    root: "/chat",
    chatsById: (id) => `/chat/${id}`,
  },
  impressum: "/impressum",
  privacyPolicy: "/privacy-policy",
  hotels: {
    root: "/hotels",
    getHotelById: (id, type) => `/hotels/${id}?type=${type}`,
  },
  nomad: {
    root: "/nomad",
    create: "/nomad/create",
    profile: (id) => `/nomad/profile/${id}`,
  },
  nomadDashboard: {
    root: "/nomad-dashboard",
    hotels: "/nomad-dashboard/hotels-list",
    events: {
      root: "/nomad-dashboard/event",
      create: "/nomad-dashboard/event/create",
      edit: (id) => `/nomad-dashboard/event/${id}`,
    },
    bookings: {
      root: "/nomad-dashboard/bookings",
    },
    notifications: "/nomad-dashboard/notifications",
  },
  hotelDashboard: {
    root: "/hotel-dashboard",
    nomads: {
      root: "/hotel-dashboard/nomads-list",
      internalNomads: "/hotel-dashboard/internal-nomads",
    },
    rooms: "/hotel-dashboard/rooms",
    internalNomads: "/hotel-dashboard/internal-nomads",
    events: {
      root: "/hotel-dashboard/event",
      create: (id) => `/hotel-dashboard/event/create?nomad_id=${id}`,
      edit: (id) => `/hotel-dashboard/event/${id}`,
    },
    bookings: {
      root: "/hotel-dashboard/bookings",
    },
    notifications: "/hotel-dashboard/notifications",
  },

  createRooms: {
    root: "/create-room",
    edit: (id) => `/create-room/${id}`,
  },
  hotelInfo: {
    root: "/hotel-info",
    edit: (id) => `/hotel-info/${id}`,
  },
  guestDashboard: {
    root: "/guest-dashboard",
    update_profile: (id) => `/profile/${id}`,
    bookings: "/guest-dashboard/bookings",
    nomads: "/guest-dashboard/nomads",
    hotels: "/guest-dashboard/hotels",
    notifications: "/guest-dashboard/notifications",
  },
  wishlist: {
    root: "/wishlist",
  },
};
