const axios = require("axios");
const redressePwn = require("./redressePwn");
const cheerio = require("cheerio");
const saveFile = require("./utils/file");

async function loadEvent(urlEvent) {
  const { data } = await axios.get(`https://pwn-association.org${urlEvent}`);
  const event = redressePwn(data);
  saveFile("pwn", event);
}

async function compilPwn() {
  const { data } = await axios.get(
    "https://pwn-association.org/tous-les-evenements-pwn/"
  );
  const $ = cheerio.load(data);
  // get all urls from page events
  $(".upcoming-events .event-inner>a").each((index, item) => {
    loadEvent(item.attribs.href);
  });
}

compilPwn();
