import { paths } from "../contants";


export const MenuLinks = (user,t) => {
  const isUserCompleted = user?.is_user_type_completed;
  const userType = user?.user_type;
  if (isUserCompleted) {
    return [
      {
        id: 1,
        label: t("links.h"),
        path: "/",
      },
      {
        id: 2,
        label: t("links.d"),
        path:
          userType === "HOTEL"
            ? paths.hotelDashboard.root
            : userType === "GUEST"
            ? paths.guestDashboard.root
            : paths.nomadDashboard.root,
      },
      {
        id: 3,
        label: t("links.about"),
        path: "/about",
      },

      {
        id: 5,
        label: t("links.cont"),
        path: "/contact",
      },
      {
        id: 6,
        label: t("links.tc"),
        path: "/terms",
      },
      {
        id: 7,
        label: t("links.impressum"),
        path: "/impressum",
      },
      {
        id: 8,
        label: t("links.pp"),
        path: "/privacy-policy",
      },
    ];
  }

  return [
    {
      id: 1,
      label: t("links.h"),
      path: "/",
    },
    {
      id: 3,
      label: t("links.about"),
      path: "/about",
    },

    {
      id: 5,
      label: t("links.cont"),
      path: "/contact",
    },
    {
      id: 6,
      label: t("links.tc"),
      path: "/terms",
    },
    {
      id: 7,
      label: t("links.impressum"),
      path: "/impressum",
    },
    {
      id: 8,
      label: t("links.pp"),
      path: "/privacy-policy",
    },
  ];
};

export const AuthLinks = (t)=> [
  {
    id: 6,
    label: t("links.su"),
    path: "/sign-up",
  },
  {
    id: 7,
    label: t("links.log"),
    path: "/login",
  },
];
