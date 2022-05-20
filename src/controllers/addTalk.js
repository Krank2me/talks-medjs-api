require("dotenv").config();
const Airtable = require("airtable");
const { API_KEY, BASE } = process.env;
const emailer = require("./emailer");

async function addTalk(req, res) {
  const {
    fullName,
    email,
    userTwitter,
    userCompany,
    talkTitle,
    talkLevel,
    talkDescription,
    speakerDescription,
  } = req.body;

  try {
    const base = new Airtable({ apiKey: API_KEY }).base(BASE);
    base("Charlas").create(
      {
        Name: fullName,
        Email: email,
        Twitter: userTwitter,
        Talk: talkTitle,
        Level: talkLevel,
        Company: userCompany,
        Description: talkDescription,
        Role: speakerDescription,
      },
      async function (err, record) {
        if (err) {
          console.error(err);
          return;
        }
        if (record.id) {
          const bodyEmail = {
            fullName,
            email,
            userTwitter,
            talkTitle,
            talkLevel,
            userCompany,
            talkDescription,
            speakerDescription,
          };
          await emailer.sendMail(bodyEmail);
          res
            .status(200)
            .send({ message: "Talk registed success", id: record.id });
        } else {
          res
            .status(500)
            .send({ message: "an error ocurred while adding new talk" });
        }
      }
    );
  } catch (error) {
    res.status(500).send({ erroMessage: "server internal error" });
  }
}

module.exports = addTalk;
