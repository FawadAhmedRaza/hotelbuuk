import axios from "axios";
import bcrypt from "bcryptjs";
export function saltAndHashPassword(password) {
  const saltRounds = 10; // Adjust the cost factor according to your security requirements
  const salt = bcrypt.genSaltSync(saltRounds); // Synchronously generate a salt
  const hash = bcrypt.hashSync(password, salt); // Synchronously hash the password
  return hash; // Return the hash directly as a string
}

export function generateOTP(length = 6) {
  let otp = "";
  const digits = "0123456789";

  for (let i = 0; i < length; i++) {
    otp += digits[Math.floor(Math.random() * digits.length)];
  }

  return otp;
}

export const getFormattedDate = (inputDate) => {
  const date = new Date(inputDate || Date.now());

  if (inputDate) {
    date.setDate(date.getDate() + 1); // Increment the day
  }

  const options = { weekday: "short", month: "short", day: "2-digit" };
  return date.toLocaleDateString("en-US", options).replace(",", "");
};

export const convertDateFormat = (input) => {
  const date = new Date(input); // Convert "YYYY-MM-DD" to a Date object
  if (isNaN(date)) return "Invalid Date"; // Handle invalid dates

  const options = { weekday: "short", month: "short", day: "2-digit" };
  return date.toLocaleDateString("en-US", options).replace(",", "");
};

// return countries

export const getCountries = async () => {
  const res = await axios.get("https://countriesnow.space/api/v0.1/countries");

  const allCounteries = await res.data.data.map((item) => ({
    label: item.country,
    value: item.country,
  }));

  return allCounteries;
};

export const getCities = async (country) => {
  try {
    const res = await axios.post(
      "https://countriesnow.space/api/v0.1/countries/cities",
      {
        country: country,
      }
    );

    const allCities = res.data.data.map((city) => ({
      label: city,
      value: city,
    }));

    return allCities;
  } catch (error) {
    console.error("Error fetching cities:", error);
    return [];
  }
};

export function calculateDaysBetweenDates(date1, date2) {
  const date1Ms = new Date(date1).getTime();
  const date2Ms = new Date(date2).getTime();

  const diffMs = Math.abs(date2Ms - date1Ms);

  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  return diffDays + 1;
}

// EVENTS FILTER
export function eventsFilter(events, filters) {
  const filteredResults = events.filter((event) => {
    const titleMatches = event.title
      .toLowerCase()
      .includes(filters.event_name.toLowerCase());
    console.log(`Title matches (${event.title}):`, titleMatches);

    // Price validation
    const priceValid =
      filters.price !== null ? parseFloat(event.price) <= filters.price : true;

    // Rating validation
    const eventRating = (event?.hotel && event.hotel?.stars) || 0; // Default to 0 if no rating
    const ratingValid =
      filters.rating.length > 0 ? filters.rating.includes(eventRating) : true;

    // Location validation
    const eventLocation = event.city || event.hotel?.city;
    const locationValid =
      filters.location.length > 0
        ? filters.location.includes(eventLocation)
        : true;

    // Nomad validation
    const nomadValid =
      filters.nomad.length > 0 ? filters.nomad.includes(event.nomad_id) : true;

    // Return true if all conditions are met
    return (
      titleMatches && priceValid && ratingValid && locationValid && nomadValid
    );
  });

  return filteredResults;
}

// // FILTER WITH DATES
// export function filterEventsByDateAndDestination(
//   events,
//   checkIn,
//   checkOut,
//   destination
// ) {
//   // Convert checkIn and checkOut strings to Date objects if they are provided
//   const checkInDate = checkIn ? new Date(checkIn) : null;
//   const checkOutDate = checkOut ? new Date(checkOut) : null;

//   // Filter events based on the provided conditions
//   return events.filter((event) => {
//     // Convert event start and end dates to Date objects
//     const eventStartDate = new Date(event.start_date);
//     const eventEndDate = new Date(event.end_date);

//     // Initialize filters
//     let dateRangeValid = true;
//     let destinationMatches = false;

//     // Date range filter
//     if (checkInDate && checkOutDate) {
//       // Both dates provided: check if event's date range overlaps with the check-in and check-out dates
//       dateRangeValid =
//         eventStartDate <= checkOutDate && eventEndDate >= checkInDate;
//     } else if (checkInDate) {
//       // Only check-in provided: check if the event starts after or on check-in date
//       dateRangeValid = eventStartDate >= checkInDate;
//     } else if (checkOutDate) {
//       // Only check-out provided: check if the event ends before or on check-out date
//       dateRangeValid = eventEndDate <= checkOutDate;
//     }

//     // Destination filter: Check if a destination is provided
//     if (destination) {
//       if (event.city) {
//         destinationMatches =
//           event.city.toLowerCase() === destination.toLowerCase();
//       }
//       if (!destinationMatches && event.country) {
//         destinationMatches =
//           event.country.toLowerCase() === destination.toLowerCase();
//       }

//       // If the event doesn't have its own city or country, try matching with the hotel's city or country
//       if (!destinationMatches && event.hotel) {
//         if (event.hotel.city) {
//           destinationMatches =
//             event.hotel.city.toLowerCase() === destination.toLowerCase();
//         }
//         if (!destinationMatches && event.hotel.country) {
//           destinationMatches =
//             event.hotel.country.toLowerCase() === destination.toLowerCase();
//         }
//       }
//     } else {
//       // If no destination is provided, all events pass this filter
//       destinationMatches = true;
//     }

//     // Return true if either:
//     // - both dates are provided and valid, and destination matches
//     // - or, one date is provided (check-in or check-out) and valid, and destination matches
//     return dateRangeValid && destinationMatches;
//   });
// }


// FILTER WITH DATES
export function filterEventsByDateAndDestination(
  events,
  checkIn,
  checkOut,
  destination
) {
  // Convert checkIn and checkOut strings to Date objects if they are provided
  const checkInDate = checkIn ? new Date(checkIn) : null;
  const checkOutDate = checkOut ? new Date(checkOut) : null;

  // Filter events based on the provided conditions
  return events.filter((event) => {
    // Convert event start and end dates to Date objects
    const eventStartDate = new Date(event.start_date);
    const eventEndDate = new Date(event.end_date);

    // Initialize filters
    let dateRangeValid = true;
    let destinationMatches = false;

    // Date range filter
    if (checkInDate && checkOutDate) {
      // Both dates provided: check if event's date range overlaps with the check-in and check-out dates
      dateRangeValid =
        eventStartDate <= checkOutDate && eventEndDate >= checkInDate;
    } else if (checkInDate) {
      // Only check-in provided: check if the event starts after or on check-in date
      dateRangeValid = eventStartDate >= checkInDate;
    } else if (checkOutDate) {
      // Only check-out provided: check if the event ends before or on check-out date
      dateRangeValid = eventEndDate <= checkOutDate;
    }

    // Destination filter: Check if a destination is provided
    if (destination) {
      // Convert the destination to lowercase for case-insensitive matching
      const destinationLower = destination.toLowerCase();

      // Match destination with the event's city, country, or address
      if (event.city) {
        destinationMatches = event.city.toLowerCase() === destinationLower;
      }

      if (!destinationMatches && event.country) {
        destinationMatches = event.country.toLowerCase() === destinationLower;
      }

      // If the event doesn't have its own city or country, try matching with the hotel's city or country
      if (!destinationMatches && event.hotel) {
        if (event.hotel.city) {
          destinationMatches =
            event.hotel.city.toLowerCase() === destinationLower;
        }
        if (!destinationMatches && event.hotel.country) {
          destinationMatches =
            event.hotel.country.toLowerCase() === destinationLower;
        }
      }

      // Additional check for matching full or partial address (including street address)
      if (!destinationMatches && event.address) {
        // Match if the full address or partial address contains the destination
        destinationMatches = event.address
          .toLowerCase()
          .includes(destinationLower);
      }
    } else {
      // If no destination is provided, all events pass this filter
      destinationMatches = true;
    }

    // Return true if either:
    // - both dates are provided and valid, and destination matches
    // - or, one date is provided (check-in or check-out) and valid, and destination matches
    return dateRangeValid && destinationMatches;
  });
}
