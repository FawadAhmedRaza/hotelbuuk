export const NomadList = [
  {
    id: 1,
    date: "21-10-2024",
    title: "London Tour",
    availability: "Yes",
    guest: {
      name: "Fawad",
      country: "France",
      image: "/assets/images/man1.jpeg",
    },
    hotel: {
      name: "Hotel ABC",
      image: "/assets/images/hotel-det-1.png",
    },
    accommodation_type: "Hotel",
    status: "Active",
  },
  {
    id: 2,
    date: "22-10-2024",
    title: "Paris Getaway",
    availability: "No",
    guest: {
      name: "Larry",
      country: "Germany",
      image: "/assets/images/man2.jpeg",
    },
    hotel: {
      name: "Central Park Hotel",
      image: "/assets/images/hotel-det-2.png",
    },
    accommodation_type: "B&B",
    status: "Inactive",
  },
  {
    id: 3,
    date: "23-10-2024",
    title: "New York City Adventure",
    availability: "Yes",
    guest: {
      name: "John",
      country: "USA",
      image: "/assets/images/man11.jpeg",
    },
    hotel: {
      name: "Shibuya Inn",
      image: "/assets/images/hotel-det-3.png",
    },
    accommodation_type: "Hotel",
    status: "Pending",
  },
  {
    id: 4,
    date: "24-10-2024",
    title: "Tokyo Food Tour",
    availability: "Yes",
    guest: {
      name: "Sakura",
      country: "Japan",
      image: "/assets/images/man12.jpeg",
    },
    hotel: {
      name: "Burj Al Arab",
      image: "/assets/images/hotel-det-4.png",
    },
    accommodation_type: "B&B",
    status: "Active",
  },
  {
    id: 5,
    date: "25-10-2024",
    title: "Sydney Beach Holiday",
    availability: "No",
    guest: {
      name: "Liam",
      country: "Australia",
      image: "/assets/images/man13.jpg",
    },
    hotel: {
      name: "Sydney Beach Resort",
      image: "/assets/images/hotel-det-5.png", // Example hotel image
    },
    accommodation_type: "Hotel",
    status: "Cancelled",
  },
];

export const hotelRules = [
  {
    ruleId: 1,
    name: "check-in",
    title: "Check-in Time",
    description: "Guests can check in from 2:00 PM onwards.",
    priority: "High",
  },
  {
    ruleId: 2,
    name: "check-out",
    title: "Check-out Time",
    description: "Check-out is required by 11:00 AM to avoid extra charges.",
    priority: "High",
  },
  {
    ruleId: 3,
    name: "cancellation_policy",
    title: "Cancellation Policy",
    description:
      "Free cancellation up to 24 hours before the check-in date. After that, 50% of the total booking amount will be charged.",
    priority: "Medium",
  },
  {
    ruleId: 4,
    name: "no_smoking",
    title: "No Smoking",
    description:
      "Smoking is prohibited inside the rooms. A cleaning fee of $200 will apply for violations.",
    priority: "High",
  },
  {
    ruleId: 5,
    name: "pets_policy",
    title: "Pets Policy",
    description:
      "Small pets are allowed with prior approval. An extra charge of $50 per night applies.",
    priority: "Low",
  },
  {
    ruleId: 6,
    name: "quiet_hours",
    title: "Quiet Hours",
    description:
      "Quiet hours are from 10:00 PM to 7:00 AM to ensure the comfort of all guests.",
    priority: "Medium",
  },
  {
    ruleId: 7,
    name: "pool_usage",
    title: "Pool Usage",
    description:
      "Pool access is allowed between 8:00 AM and 8:00 PM. Guests must follow safety instructions.",
    priority: "Low",
  },

  {
    ruleId: 8,
    name: "payment_policy",
    title: "Payment Policy",
    description:
      "Full payment is required upon check-in. We accept cash, credit, or debit cards.",
    priority: "High",
  },
];
