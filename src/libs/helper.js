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
