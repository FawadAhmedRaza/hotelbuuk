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
    forgotPassword: "/forgot-password",
    changePassword: "/change-password",
  },
  about: "/about",
  terms: "/terms",
  impressum: "/impressum",
  privacyPolicy: "/privacy-policy",
  hotels: {
    root: "/hotels",
    getHotelById: (id) => `/hotels/${id}`,
  },
  nomad: {
    root: "/nomad",
    create: "/nomad/create",
  },
  nomadDashboard: {
    root: "/nomad-dashboard",
    hotels: "/nomad-dashboard/hotels-list",
    events: {
      root: "/nomad-dashboard/event",
      create: "/nomad-dashboard/event/create",
    },
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
      create: "/hotel-dashboard/event/create",
      edit: (id) => `/hotel-dashboard/event/${id}`,
    },
  },
  createRooms: {
    root: "/create-room",
    edit: (id) => `/create-room/${id}`,
  },
  hotelInfo: {
    root: "/hotel-info",
    edit: (id) => `/hotel-info/${id}`,
  },
};
