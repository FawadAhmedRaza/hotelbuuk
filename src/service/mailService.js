import nodemailer from "nodemailer";

export async function sendMail(subject, toEmail, htmlContent) {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  var mailOptions = {
    from: process.env.EMAIL,
    to: toEmail,
    subject: subject,
    html: htmlContent,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log("email send error", error);
      throw new Error(error);
    } else {
      console.log("Email Sent");
      return true;
    }
  });
}
