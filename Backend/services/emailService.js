const dotenv = require("dotenv").config();
const formData = require("form-data");
const Mailgun = require("mailgun.js");

const mailgun = new Mailgun(formData);

const mg = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_DOMAIN,
});

const sendVerificationMail = async ({ userEmail, token }) => {
  const messageData = {
    from: "YourApp <noreply@yourdomain.com>",
    to: userEmail,
    subject: "Please verify your email",
    html: `
      <p>${userEmail} created.</p>
      <p>Please verify your email by clicking the link below:</p>
      <a href="https://yourapp.com/verify?token=${token}">Verify Email</a>
    `,
  };

  try {
    const response = await mg.messages.create(
      process.env.MAILGUN_DOMAIN,
      messageData
    );

    console.log("email sent", response);
  } catch (error) {
    console.log("error", error);
  }
};

module.exports = { sendVerificationMail };
