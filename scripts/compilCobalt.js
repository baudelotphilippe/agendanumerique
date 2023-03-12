const fs = require("fs");
const axios = require("axios");
const cheerio = require("cheerio");
const cobalt = require("./redresseCobalt");
const saveFile = require("./utils/file");

async function getStaticProps() {
  const { data } = await axios.get(
    "https://www.cobaltpoitiers.fr/programmation/"
  );
  const $ = cheerio.load(data);
  $('.evo_event_schema').each((index, item) => { 

    const event = cobalt(item.children[item.children.length-1].children[0].data);

    event.url=item.children[0].attribs.href;
    event.location.name="Cobalt Poitiers"
    event.location.address.addressLocality="86000 Poitiers"
    event.location.address.streetAddress="5 Rue Victor Hugo"

    saveFile("cobalt", event)
  });
}

getStaticProps();
