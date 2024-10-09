export function otpTemplate(name, otp) {
  return `Dear ${name},

We received a request to verify your identity for [purpose of verification, e.g., logging into your account, completing a transaction, etc.]. Please use the One-Time Password (OTP) below to complete the process:

Your OTP: ${otp}

This OTP is valid for [expiry time, e.g., 10 minutes]. Please do not share this code with anyone for security reasons.

If you did not request this, please ignore this email, or contact our support team immediately.

Thank you for using [Your Company Name]!

Best regards,`;
}
