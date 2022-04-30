require("dotenv").config();
const Airtable = require('airtable');
const { API_KEY, BASE } = process.env;
const emailer = require('./emailer')

async function addTalk (req, res) {
  const {name, talk} = req.body;

  try {
    const base = new Airtable({ apiKey: API_KEY }).base(BASE);
    base('Charlas').create(
      {
        "Name": name,
        "Talk": talk
      }
    , function(err, record) {
      if (err) {
        console.error(err);
        return;
      }
      if (record.id) {
        const bodyEmail = {name, talk};
        emailer.sendMail(bodyEmail);
        res.status(200).send({message: 'Talk added success', id: record.id});
      } else {
        res.status(500).send({message: 'an error ocurred while adding new talk'});
      }
    });
  } catch (error) {
    res.status(500).send({erroMessage: 'server internal error'});
  }
}

module.exports = addTalk;