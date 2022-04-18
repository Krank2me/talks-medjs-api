var Airtable = require('airtable');
require("dotenv").config();
const { API_KEY, BASE } = process.env;

async function addTalk (req, res) {
  const {name, talk} = req.body;
  const base = new Airtable({ apiKey: API_KEY }).base(BASE);

  try {
    base('Charlas').create([
      {
        "fields": {
          "Name": name,
          "Talk": talk
        }
      }
    ], function(err, records) {
      if (err) {
        console.error(err);
        return;
      }
      records.forEach(function (record) {
        if (record.id) {
          res.status(200).send({message: 'Talk added success', id: record.id});
        } else {
          res.status(500).send({message: 'an error ocurred while adding new talk'});
        }
        console.log(record.getId());
      });
    });
  } catch (error) {
    res.status(500).send({erroMessage: 'server internal error'});
  }
}

module.exports = addTalk;