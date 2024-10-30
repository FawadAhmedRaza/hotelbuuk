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

  return diffDays;
}
