require("dotenv").config();
const nodemailer = require('nodemailer');
const nodemailerSendgrid = require('nodemailer-sendgrid');
const {SENDGRID_API_KEY} = process.env;

const createTransport = () => {
  return nodemailer.createTransport(
    nodemailerSendgrid({apiKey: SENDGRID_API_KEY})
  );
}

const sendMail = async (bodyEmail) => {
  try {
    const transporter = await createTransport();
    await transporter.sendMail({
      from: '"Panda" <alejok6@gmail.com>',
      to: [
        'alejok6@gmail.com'
      ],
      subject: `Hola! ${bodyEmail.fullName} ha registrado una nueva charla para MedellinJS`,
      html: `
        <b>Hola esta es la charla registrada: </b> <br><br>
        <label><b>Speaker: </b></label>
        ${bodyEmail.fullName}
        <br><br>
        <label><b>Email: </b></label>
        ${bodyEmail.email}
        <br><br>
        <label><b>Twitter: </b></label>
        ${bodyEmail.userTwitter}
        <br><br>
        <label><b>Titulo de la Charla: </b></label>
        ${bodyEmail.talkTitle}
        <br><br>
        <label><b>Descripcón de la charla: </b></label>
        ${bodyEmail.talkDescription}
        <br><br>
        <label><b>Sobre el speaker: </b></label>
        ${bodyEmail.speakerDescription}
        <br><br>
      `
    });
  } catch (error) {
    console.log('Error: ', error);
  }
}

exports.sendMail = (bodyEmail) => sendMail(bodyEmail);
