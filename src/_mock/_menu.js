import { paths } from "../contants";

const allLinks = [];

export const MenuLinks = (user) => {
  const isUserCompleted = user?.is_user_type_completed;
  const userType = user?.user_type;

  if (isUserCompleted) {
    return [
      {
        id: 1,
        label: "Home",
        path: "/",
      },
      {
        id: 2,
        label: "Dashboard",
        path:
          userType === "HOTEL"
            ? paths.hotelDashboard.root
            : userType === "GUEST"
            ? paths.guestDashboard.root
            : paths.nomadDashboard.root,
      },
      {
        id: 3,
        label: "Find a Network",
        path: "#network",
      },
      {
        id: 4,
        label: "About Us",
        path: "/about",
      },

      {
        id: 5,
        label: "Contact US",
        path: "/contact",
      },
      {
        id: 6,
        label: "Wishlist ",
        path: "/wishlist",
      },
      {
        id: 7,
        label: "Terms and Conditions",
        path: "/terms",
      },
      {
        id: 8,
        label: "Impressum",
        path: "/impressum",
      },
      {
        id: 9,
        label: "Privacy Policy",
        path: "/privacy-policy",
      },
    ];
  }

  return [
    {
      id: 1,
      label: "Home",
      path: "/",
    },
    {
      id: 3,
      label: "About Us",
      path: "/about",
    },

    {
      id: 5,
      label: "Contact US",
      path: "/contact",
    },
    {
      id: 6,
      label: "Terms and Conditions",
      path: "/terms",
    },
    {
      id: 7,
      label: "Impressum",
      path: "/impressum",
    },
    {
      id: 8,
      label: "Privacy Policy",
      path: "/privacy-policy",
    },
  ];
};

export const AuthLinks = [
  {
    id: 6,
    label: "Sign Up",
    path: "/sign-up",
  },
  {
    id: 7,
    label: "Login",
    path: "/login",
  },
];
