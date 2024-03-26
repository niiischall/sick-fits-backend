import { createTransport, getTestMessageUrl } from "nodemailer";

const transport = createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const makeAnEmail = (text: string) => {
  return `
        <div style="
            border: 1px solid black;
            padding: 20px;
            font-family: sans-serif;
            line-height: 2;
            font-size: 20px;
        ">
          <h3>Hello there!</h3>
          <p>${text}</p>
          <p>Regards,</p>
          <p>Nischal Nikit</p>
        </div>
    `;
};

export const sendPasswordResetEmail = async (
  resetToken: string,
  to: string
) => {
  const response = await transport.sendMail({
    to,
    from: "test@example",
    subject: "Your password reset token",
    html: makeAnEmail(`
        <h3>Your password reset token!</h3>
        <a href=${process.env.FRONTEND_URL}/reset?token=${resetToken}>Click here to reset!</a>
    `),
  });

  if (process.env.MAIL_USER.includes("ethereal")) {
    console.log(`Mail sent! Please check ${getTestMessageUrl(response)}`);
  }
};
