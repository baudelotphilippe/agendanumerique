const cheerio = require("cheerio");
const fs = require("fs");
const utilsFile = require("./utils/file");
const redresseAfup = require("./redresseAfup");

const infosFilename = { workingFolder: "afup", i: false, uniqueId: false };

async function loadEvent(urlEvent) {
  const data = await fetch(urlEvent);
  const text = await data.text();

  const event = redresseAfup(text);
  utilsFile.saveFile(infosFilename, event);
}

async function compilAfup() {
  const data = await fetch(
    "https://www.meetup.com/fr-FR/afup-poitiers-php/events/"
  );
  const text = await data.text();

  const $ = cheerio.load(text);
  await utilsFile.cleanFolder(infosFilename.workingFolder);
  for (const item of $("ul.w-full>li>div>a").toArray()) {
    loadEvent(item.attribs.href);
  }
}

compilAfup();
