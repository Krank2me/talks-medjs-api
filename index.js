const Airtable = require("airtable");
require("dotenv").config();

const { API_KEY, BASE } = process.env;

const base = new Airtable({ apiKey: API_KEY }).base(BASE);

base("Charlas")
  .select({
    maxRecords: 3,
    view: "AllTalks",
  })
  .eachPage(
    function page(records, fetchNextPage) {
      records.forEach(function (record) {
        console.log("Speaker name: ", record.get("Name"));
      });
      fetchNextPage();
    },
    function done(err) {
      if (err) {
        console.error(err);
        return;
      }
    }
  );
