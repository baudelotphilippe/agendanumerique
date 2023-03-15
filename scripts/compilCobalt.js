const axios = require("axios");
const cheerio = require("cheerio");
const redresseCobalt = require("./redresseCobalt");
const utilsFile = require("./utils/file");

const workingFolder="cobalt";

async function compilCobalt() {
  const { data } = await axios.get(
    "https://www.cobaltpoitiers.fr/programmation/"
  );
  const $ = cheerio.load(data)
  await utilsFile.cleanFolder(workingFolder)
  $('.evo_event_schema').each((index, item) => { 

    const event = redresseCobalt(item.children[item.children.length-1].children[0].data);

    event.url=item.children[0].attribs.href;
    event.location.name="Cobalt Poitiers"
    event.location.address.addressLocality="86000 Poitiers"
    event.location.address.streetAddress="5 Rue Victor Hugo"

    utilsFile.saveFile(workingFolder, event)
  });
}

compilCobalt();
