export const invitationEmailTemplate = (name, imageUrl, query) => {
  const image =
    imageUrl ||
    "https://images.unsplash.com/photo-1579625224451-b0ab6ed101f5?q=80&w=1421&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  return `
       <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Invitation Email</title>
    <style>
      body {
        margin: 0;
        padding: 0;
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
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
        font-size: 36px;
      }
      .email-body {
        padding: 20px;
        text-align: center;
      }
      .email-body p {
        font-size: 16px;
        line-height: 1.6;
        color: #333333;
        margin: 10px 0;
      }
      .email-body img {
        border-radius: 50%;
        width: 150px;
        height: 150px;
        object-fit: cover;
        border: 5px solid #852169;
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
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="email-header">
        <h1>Hotelbuuk</h1>
      </div>
      <div class="email-body">
       <img
            src="${image}"
            alt="Hotel Image"
            style="border-radius: 50%; width: 150px; height: 150px; object-fit: cover; border: 5px solid #852169;"
          />
        <p><strong>${name}</strong></p>
        <p>You are invited to become our internal Nomad.</p>
        <div>
          <button class="btns" style="color:white;">Decline</button>
          <a
            href="${process.env.ACCEPT_INVITATION_LINK + `${query}`}"
            class="btns"
            style="color:white;"
            >Accept</a
          >
        </div>
      </div>
      <div class="email-footer">
        <p>
          Visit us at <a href="https://hotelbuuk.vercel.app/">Hotelbukk.com</a>
        </p>
        <p>Best regards,<br />Hotelbukk Team</p>
      </div>
    </div>
  </body>
</html>

        `;
};
