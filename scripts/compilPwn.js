const axios = require("axios");
const redressePwn = require("./redressePwn");
const cheerio = require("cheerio");
const utilsFile = require("./utils/file");
const workingFolder="pwn"

async function loadEvent(urlEvent) {
  const { data } = await axios.get(`https://pwn-association.org${urlEvent}`);
  const event = redressePwn(data);
  utilsFile.saveFile(workingFolder, event);
}

async function compilPwn() {
  const { data } = await axios.get(
    "https://pwn-association.org/tous-les-evenements-pwn/"
  );
  const $ = cheerio.load(data);
  await utilsFile.cleanFolder(workingFolder)
  // get all urls from page events
  $(".upcoming-events .event-inner>a").each((index, item) => {
    loadEvent(item.attribs.href);
  });
}

compilPwn();
