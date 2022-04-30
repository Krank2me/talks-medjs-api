require("dotenv").config();
const nodemailer = require('nodemailer');
const nodemailerSendgrid = require('nodemailer-sendgrid');
const sgTransport = require('nodemailer-sendgrid-transport');
const {SENDGRID_API_KEY} = process.env;

const createTransport = () => {

  return nodemailer.createTransport(
    nodemailerSendgrid({apiKey: SENDGRID_API_KEY})
  );

  /* const options = {
    auth: {
      api_key: SENDGRID_API_KEY
    }
  }
  return nodemailer.createTransport(sgTransport(options)); */
}

const sendMail = async (bodyEmail) => {
  console.log('bodyEmail: ', bodyEmail);
  const transporter = await createTransport();
  const info =  transporter.sendMail({
    from: '"MedellinJS" <medellinjs@gmail.com>',
    to: [
      'alejok6@gmail.com'
    ],
    subject: `Hola! ${bodyEmail.name} ha registrado una nueva charla para MedellinJS`,
    html: '<b>Holi!!!</b>'
  });

  return info;
}

exports.sendMail = (bodyEmail) => sendMail(bodyEmail);
