import jwt from "jsonwebtoken";

const jwt_secret = process.env.JWT_SECRET || "hottle-buuk";

const generateToken = async (data) => {
  return jwt.sign(data, jwt_secret, { expiresIn: "2d" });
};

export {generateToken}
