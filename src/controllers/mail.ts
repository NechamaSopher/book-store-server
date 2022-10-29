import * as nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';

dotenv.config();

class MailCtrl {
  /** @param {*} data - contain keys: from, to, subject, text, html */

  static async send(data) {
    const testAccount = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

    const info = await transporter.sendMail(data);

    return nodemailer.getTestMessageUrl(info);
  }
}

export default MailCtrl;

// Example createTransport for not test account
const createTransporter = () => {
  const data = JSON.parse(process.env.MAIL_TRANSPORT_DETAILS || '{}');

  return nodemailer.createTransport({
    host: data.SMTP_HOST,
    port: data.SMTP_PORT,
    secure: data.SMTP_PORT !== 587,
    auth: {
      user: data.SMTP_USER,
      pass: data.SMTP_PASSWORD
    },
    from: `<${data.SMTP_FROM_ADDRESS}> ${data.SMTP_FROM_NAME}`,
  });
}
