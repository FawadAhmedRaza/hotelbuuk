export const invitationEmailTemplate = (name, imageUrl, query) => {
  return `
        <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Invitation Email</title>
  </head>
  <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #ececec;">
    <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="background-color: #ececec; padding: 20px;">
      <tr>
        <td style="text-align: center;">
          <h1 style="color: #852169; font-size: 36px;">Hotelbuuk</h1>
        </td>
      </tr>
      <tr>
        <td style="text-align: center; padding: 20px;">
          <img
            src="${
              imageUrl ||
              "https://images.unsplash.com/photo-1579625224451-b0ab6ed101f5?q=80&w=1421&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }"
            alt="Hotel Image"
            style="border-radius: 50%; width: 150px; height: 150px; object-fit: cover; border: 5px solid #852169;"
          />
        </td>
      </tr>
      <tr>
        <td style="text-align: center; font-size: 24px; color: #000;">
          <strong>${name}</strong>
        </td>
      </tr>
      <tr>
        <td style="text-align: center; font-size: 16px; color: #333; padding: 10px 0;">
          You are invited to become our internal Nomad.
        </td>
      </tr>
      <tr>
        <td style="text-align: center; padding: 20px;">
          <button style="background-color: #852169; color: white; border: none; padding: 10px 20px; border-radius: 100px; cursor: pointer;">Decline</button>
          <a href="${
            process.env.ACCEPT_INVITATION_LINK + `${query}`
          }" 
   style="background-color: #852169; color: white; text-decoration: none; padding: 10px 20px; border-radius: 100px; margin-right: 10px;">Accept</a>

        </td>
      </tr>
    </table>
  </body>
</html>

        `;
};
