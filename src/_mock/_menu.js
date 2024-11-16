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
        icon: "material-symbols:home",
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
        icon: "ic:round-dashboard",
      },
      {
        id: 3,
        label: "Find a Network",
        path: "#network",
        icon: "eos-icons:network",
      },
      {
        id: 4,
        label: "About Us",
        path: "/about",
        icon: "mdi:about",
      },

      {
        id: 5,
        label: "Contact US",
        path: "/contact",
        icon: "material-symbols:contact-mail",
      },
      {
        id: 6,
        label: "Wishlist ",
        path: "/wishlist",
        icon: "mdi:heart",
      },
      {
        id: 7,
        label: "Terms and Conditions",
        path: "/terms",
        icon: "fluent-mdl2:entitlement-policy",
      },
      {
        id: 8,
        label: "Impressum",
        path: "/impressum",
        icon: "mi:document",
      },
      {
        id: 9,
        label: "Privacy Policy",
        path: "/privacy-policy",
        icon: "iconoir:privacy-policy",
      },
    ];
  }

  return [
    {
      id: 1,
      label: "Home",
      path: "/",
      icon: "material-symbols:home",
    },
    {
      id: 3,
      label: "About Us",
      path: "/about",
      icon: "mdi:about",
    },

    {
      id: 5,
      label: "Contact US",
      path: "/contact",
      icon: "material-symbols:contact-mail",
    },
    {
      id: 6,
      label: "Terms and Conditions",
      path: "/terms",
      icon: "fluent-mdl2:entitlement-policy",
    },
    {
      id: 7,
      label: "Impressum",
      path: "/impressum",
      icon: "mi:document",
    },
    {
      id: 8,
      label: "Privacy Policy",
      path: "/privacy-policy",
      icon: "iconoir:privacy-policy",
    },
  ];
};

export const AuthLinks = [
  {
    id: 6,
    label: "Sign Up",
    path: "/sign-up",
    icon: "mdi:register",
  },
  {
    id: 7,
    label: "Login",
    path: "/login",
    icon: "material-symbols:login",
  },
];
