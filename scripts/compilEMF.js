import * as cheerio from "cheerio";

import {cleanFolder,saveFile} from "./utils/file.js";
import redresseEMF from "./redresseEMF.js";

const infosFilename = { workingFolder: "emf", i: false, uniqueId: false };

async function loadEvent(urlEvent) {
  const data = await fetch(urlEvent);
  const text = await data.text();
  const event = redresseEMF(text);
  saveFile(infosFilename, event);
}

async function compilEMF() {
  const data = await fetch(
    "https://emf.fr/events/?s=&date=&posts_per_page=20&tax=discipline[numerique]"
  );
  const text = await data.text();

  const $ = cheerio.load(text);
  await cleanFolder(infosFilename.workingFolder);
  for (const item of $(".elementor-46496>.elementor-element> .elementor-element.elementor-element-c3baf3a.e-con-full.e-flex.e-con.e-child").toArray()) {
     loadEvent(item.attribs.href);
    //  console.log(item.attribs.href)
  }
}

compilEMF();
