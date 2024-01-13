import redressePwn from "./redressePwn.js";
import * as cheerio from "cheerio";
import { saveFile, cleanFolder } from "./utils/file.js";

const infosFilename = { workingFolder: "pwn", i: false, uniqueId: false };

async function loadEvent(urlEvent) {
  const data = await fetch(`https://pwn-association.org${urlEvent}`).then(
    (res) => res.text()
  );
  const event = redressePwn(data);
  saveFile(infosFilename, event);
}

async function compilPwn() {
  const data = await fetch(
    "https://pwn-association.org/tous-les-evenements-pwn/"
  ).then((res) => res.text());
  const $ = cheerio.load(data);
  await cleanFolder(infosFilename.workingFolder);
  // get all urls from page events
  $(".upcoming-events .event-inner>a").each((index, item) => {
    loadEvent(item.attribs.href);
  });
}

compilPwn();
