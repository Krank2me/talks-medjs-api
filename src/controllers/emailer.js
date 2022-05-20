require("dotenv").config();
const nodemailer = require("nodemailer");
const nodemailerSendgrid = require("nodemailer-sendgrid");
const template = require("../template/index");
const { SENDGRID_API_KEY, MAFE_EMAIL, KHRIS_EMAIL, FRANK_EMAIL, FROM_EMAIL } =
  process.env;

const createTransport = () => {
  return nodemailer.createTransport(
    nodemailerSendgrid({ apiKey: SENDGRID_API_KEY })
  );
};

const sendMail = async (bodyEmail) => {
  try {
    const transporter = await createTransport();
    await transporter.sendMail({
      from: FROM_EMAIL,
      to: [MAFE_EMAIL, KHRIS_EMAIL, FRANK_EMAIL],
      subject: `Hola! ${bodyEmail.fullName} ha registrado una nueva charla para MedellinJS`,
      html: template.htmlTemplate(bodyEmail),
    });
  } catch (error) {
    console.log("Error: ", error);
  }
};

exports.sendMail = (bodyEmail) => sendMail(bodyEmail);
