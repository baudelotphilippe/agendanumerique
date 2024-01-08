import * as cheerio from "cheerio";

import {cleanFolder,saveFile} from "./utils/file.js";
import redresseAfup from "./redresseAfup.js";

const infosFilename = { workingFolder: "afup", i: false, uniqueId: false };

async function loadEvent(urlEvent) {
  const data = await fetch(urlEvent);
  const text = await data.text();

  const event = redresseAfup(text);
  saveFile(infosFilename, event);
}

async function compilAfup() {
  const data = await fetch(
    "https://www.meetup.com/fr-FR/afup-poitiers-php/events/"
  );
  const text = await data.text();

  const $ = cheerio.load(text);
  await cleanFolder(infosFilename.workingFolder);
  for (const item of $("ul.w-full>li>div>a").toArray()) {
    loadEvent(item.attribs.href);
  }
}

compilAfup();
