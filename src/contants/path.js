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
  getHotelById: (id) => `/hotels/${id}`,
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
    nomads: "/hotel-dashboard/nomads-list",
  },
  hotelInfo: "/hotel-info",
};
