require("dotenv").config();
const nodemailer = require("nodemailer");
const nodemailerSendgrid = require("nodemailer-sendgrid");
const template = require("../template/index");
const { SENDGRID_API_KEY } = process.env;

const createTransport = () => {
  return nodemailer.createTransport(
    nodemailerSendgrid({ apiKey: SENDGRID_API_KEY })
  );
};

const sendMail = async (bodyEmail) => {
  try {
    const transporter = await createTransport();
    await transporter.sendMail({
      from: '"Panda" <alejok6@gmail.com>',
      to: ["alejok6@gmail.com"],
      subject: `Hola! ${bodyEmail.fullName} ha registrado una nueva charla para MedellinJS`,
      html: template.htmlTemplate(bodyEmail),
    });
  } catch (error) {
    console.log("Error: ", error);
  }
};

exports.sendMail = (bodyEmail) => sendMail(bodyEmail);
