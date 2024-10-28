export const paths = {
  root: "/",
  notFoeund: "/*",
  auth: {
    root: "/",
    login: "/login",
    signUp: "/sign-up",
    OTPCode: "verify-code",
    set_user_type: "/setup-user-profile",
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
  },
  hotelDashboard: {
    root: "/hotel-dashboard",
    nomads: {
      root: "/hotel-dashboard/nomads-list",
      internalNomads: "/hotel-dashboard/internal-nomads",
    },
    rooms: "/hotel-dashboard/rooms",
    internalNomads: "/hotel-dashboard/internal-nomads",
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
