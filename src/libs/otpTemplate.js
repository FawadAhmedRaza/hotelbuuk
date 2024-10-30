export function otpTemplate(name, otp) {
  return `Dear ${name},

We received a request to verify your identity for [purpose of verification, e.g., logging into your account, completing a transaction, etc.]. Please use the One-Time Password (OTP) below to complete the process:

Your OTP: ${otp}

This OTP is valid for [expiry time, e.g., 10 minutes]. Please do not share this code with anyone for security reasons.

If you did not request this, please ignore this email, or contact our support team immediately.

Thank you for using HotelBukk!

Best regards,`;
}

export function forgotPasswordTemplate(
  name,
  otp,
  purpose = "resetting your password",
  expiryTime = "10 minutes"
) {
  return `Dear ${name},

We received a request to verify your identity for ${purpose}. Please use the One-Time Password (OTP) below to complete the process:

Your OTP: ${otp}

This OTP is valid for ${expiryTime}. Please do not share this code with anyone for security reasons.

If you did not request this, please ignore this email, or contact our support team immediately.

Thank you for using HotelBukk!

Best regards,
The HotelBukk Team`;
}

const generateRegistrationOtpTemplate = (userName, otp) => {
  return `
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hotelbukk Verification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .email-header {
            background-color: #852169;
            padding: 10px;
            text-align: center;
            border-radius: 10px 10px 0 0;
        }
        .email-header h1 {
            margin: 0;
            color: #ffffff;
            font-size: 24px;
        }
        .email-body {
            padding: 20px;
        }
        .email-body p {
            font-size: 16px;
            line-height: 1.6;
            color: #333333;
        }
        .otp-code {
            font-size: 24px;
            font-weight: bold;
            color: #852169;
            margin: 20px 0;
            text-align: center;
        }
        .email-footer {
            text-align: center;
            margin-top: 20px;
        }
        .email-footer a {
            text-decoration: none;
            color: #852169;
            font-weight: bold;
        }
        .email-footer p {
            font-size: 14px;
            color: #777777;
        }
        .button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #9427D6;
            color: #ffffff;
            text-decoration: none;
            border-radius: 5px;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="email-header">
            <h1>Hotelbuuk</h1>
        </div>
        <div class="email-body">
            <p>Hello <strong>${userName}</strong>,</p>
            <p>To complete your verification, please use the following code:</p>
            <div class="otp-code">${otp}</div>
            <p>This code will expire in 10 minutes.</p>
            <p>If you did not request a verification code, please ignore this message or contact our support team.</p>
        </div>
        <div class="email-footer">
            <p>Visit us at <a href="https://hotelbuuk.vercel.app/">Hotelbuuk.com</a></p>
            <p>Best regards,<br>Hotelbuuk Team</p>
        </div>
    </div>
</body>
</html>
`;
};

const generateResetPasswordOtpTemplate = (userName, otp) => {
  return `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset - Hotelbuuk</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .email-header {
            background-color: #852169;
            padding: 10px;
            text-align: center;
            border-radius: 10px 10px 0 0;
        }
        .email-header h1 {
            margin: 0;
            color: #ffffff;
            font-size: 24px;
        }
        .email-body {
            padding: 20px;
        }
        .email-body p {
            font-size: 16px;
            line-height: 1.6;
            color: #333333;
        }
        .otp-code {
            font-size: 24px;
            font-weight: bold;
            color: #852169;
            margin: 20px 0;
            text-align: center;
        }
        .email-footer {
            text-align: center;
            margin-top: 20px;
        }
        .email-footer a {
            text-decoration: none;
            color: #852169;
            font-weight: bold;
        }
        .email-footer p {
            font-size: 14px;
            color: #777777;
        }
        .button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #9427D6;
            color: #ffffff;
            text-decoration: none;
            border-radius: 5px;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="email-header">
            <h1>Hotelbuuk</h1>
        </div>
        <div class="email-body">
            <p>Hello <strong>${userName}</strong>,</p>
            <p>It seems you requested a password reset. Use the following code to proceed with the reset process:</p>
            <div class="otp-code">${otp}</div>
            <p>This code will expire in 10 minutes.</p>
            <p>If you did not request a password reset, please ignore this message or contact our support team.</p>
        </div>
        <div class="email-footer">
            <p>Visit us at <a href="https://hotelbuuk.vercel.app/">Hotelbuuk.com</a></p>
            <p>Best regards,<br>Hotelbuuk Team</p>
        </div>
    </div>
</body>
</html>
`;
};

export { generateRegistrationOtpTemplate, generateResetPasswordOtpTemplate };
