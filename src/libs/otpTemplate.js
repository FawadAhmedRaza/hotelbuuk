export function otpTemplate(name, otp) {}

export function forgotPasswordTemplate(
  name,
  otp,
  purpose = "resetting your password",
  expiryTime = "10 minutes"
) {}

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

const generateBookingRequestTemplate = (
  organizerName,
  eventName,
  guestName,
  guestEmail,
  guestPhone
) => {
  return `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Event Booking - Hotelbuuk</title>
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
        .btns {
            display: inline-block;
            padding: 10px 20px;
            background-color: #852169;
            color: white;
            text-decoration: none;
            border-radius: 100px;
            margin: 5px;
            cursor: pointer;
            border:none;
        }
        .btn-div{
            display:flex;
            justify-content:center;
            align-items:center;
            max-width: 600px;
        }

    </style>
</head>
<body>
    <div class="email-container">
        <div class="email-header">
            <h1>Hotelbuuk</h1>
        </div>
        <div class="email-body">
            <p>Hello <strong>${organizerName}</strong>,</p>
            <p>We're excited to inform you that <strong>${guestName}</strong> is interested in booking your event, <strong>${eventName}</strong>.</p>
            <p>Here are the details of the guest's inquiry:</p>
            <ul>
                <li><strong>Guest Name:</strong> ${guestName}</li>
                <li><strong>Email:</strong> ${guestEmail}</li>
                <li><strong>Phone Number:</strong> ${guestPhone}</li>
            </ul>
            <p>Please feel free to reach out to the guest directly to discuss any further details or to confirm the booking.</p>
            <p>If you need assistance, you can always contact our support team.</p>
            <div class="btn-div">
                <button class="btns" style="color: white; background-color: #852169; padding: 10px 20px; border: none; border-radius: 5px;">Chat with us</button>
            </div>
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

const generateBookingRequestAcceptedTemplate = (
  guestName,
  eventName,
  organizerName,
  organizerEmail,
  organizerPhone
) => {
  return `
      <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Event Booking - Hotelbuuk</title>
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
          .btns {
              display: inline-block;
              padding: 10px 20px;
              background-color: black;
              color: white;
              text-decoration: none;
              border-radius: 100px;
              margin: 5px;
              cursor: pointer;
              border:none;
          }
          .btn-div{
              display:flex;
              justify-content:center;
              align-items:center;
              max-width: 600px;
          }
  
      </style>
  </head>
  <body>
      <div class="email-container">
          <div class="email-header">
              <h1>Hotelbuuk</h1>
          </div>
          <div class="email-body">
              <p>Hello <strong>${guestName}</strong>,</p>
                <p>Congratulations! Your Reservation for <strong>${eventName}</strong>, has been accepted. </p>
                <p>We're thrilled that you're one step closer to attending this exciting event. Here are the details of your booking:</p>
                <ul>
                    <li><strong>Event Name:</strong> ${eventName}</li>
                    <li><strong>Organizer:</strong> ${organizerName}</li>
                    <li><strong>Contact Email:</strong> ${organizerEmail}</li>
                    <li><strong>Contact Phone Number:</strong> ${organizerPhone}</li>
                </ul>
                <p>If you'd like to reach out to the organizer directly to discuss any additional details or confirm specific arrangements, feel free to do so.</p>
                <p>Thank you for choosing us to help connect you with incredible experiences!</p>
                <div class="btn-div">
                    <button class="btns" style="color: white; background-color: #852169; padding: 10px 20px; border: none; border-radius: 5px;">Chat with us</button>
                </div>
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

const generateBookingRequestRejectedTemplate = (
  guestName,
  eventName,
  organizerName,
  organizerEmail,
  organizerPhone
) => {
  return `
        <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Event Booking - Hotelbuuk</title>
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
            .btns {
                display: inline-block;
                padding: 10px 20px;
                background-color: #852169;
                color: white;
                text-decoration: none;
                border-radius: 100px;
                margin: 5px;
                cursor: pointer;
                border:none;
            }
            .btn-div{
                display:flex;
                justify-content:center;
                align-items:center;
                max-width: 600px;
            }
    
        </style>
    </head>
    <body>
        <div class="email-container">
            <div class="email-header">
                <h1>Hotelbuuk</h1>
            </div>
            <div class="email-body">
                <p>Hello <strong>${guestName}</strong>,</p>
                    <p>Sorry! Your reservation for <strong>${eventName}</strong> was declined, possibly due to fully booked rooms.Check again <a href="https://hotelbuuk.vercel.app/">Hotelbuuk.com</a> </p>
                    <p>We understand this may be disappointing, and we apologize for any inconvenience. Here are the details of your inquiry:</p>
                    <ul>
                        <li><strong>Event Name:</strong> ${eventName}</li>
                        <li><strong>Organizer:</strong> ${organizerName}</li>
                        <li><strong>Contact Email:</strong> ${organizerEmail}</li>
                    </ul>
                    <p>If you have any questions or would like assistance in finding alternative events, please feel free to reach out to us.</p>
                    <p>Thank you for using our platform, and we hope to help you connect with future experiences!</p>
                  <div class="btn-div">
                      <button class="btns" style="color: white; background-color: #852169; padding: 10px 20px; border: none; border-radius: 5px;">Chat with us</button>
                  </div>
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

export {
  generateRegistrationOtpTemplate,
  generateResetPasswordOtpTemplate,
  generateBookingRequestTemplate,
  generateBookingRequestAcceptedTemplate,
  generateBookingRequestRejectedTemplate,
};
